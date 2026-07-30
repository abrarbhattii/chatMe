const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const http = require("http");
const { WebSocketServer } = require("ws");


const createDatabasePool = require("../config/postgres");
const createChatGateway = require("../gateways/chatGateway");

const createConversationModule = require("../features/conversations");
const createChatModule = require("../features/chat");

const createMessageRouter = require("../websocket/messageRouter");
const createConnectionHandler = require("../websocket/connectionHandler");


const healthRoutes = require("../features/health/health.routes");

const env = require("../config/env");

const createLogger = require("../config/logger");
const logger = createLogger();

const createErrorHandler = require("../middleware/errorHandler");
const errorHandler = createErrorHandler({ logger, });



module.exports = function createApplication() {

    const app = express();
    
    app.use(cors());
    app.use(express.json());
    // app.use(morgan("dev"));

    app.use(
        morgan(":method :url :status :response-time ms - :res[content-length]", {
            stream: {
                write: (message) => {
                    logger.info({ type: "http" }, message.trim());
                },
            },
        })
    );

    const server = http.createServer(app);

    const wss = new WebSocketServer({ server, });

    const pool = createDatabasePool();

    const chatGateway = createChatGateway({ wss, logger, });

    const conversations = createConversationModule({ pool, logger, });

    const chat = createChatModule({ pool, chatGateway, logger, });

    app.use("/api/v1/conversations", conversations.httpRoutes);
    
    app.use("/api/v1/health", healthRoutes);

    app.use("/api/v1", chat.httpRoutes);

    app.use(errorHandler);

    const WS_handlers = { ...chat.websocketHandlers, };

    const router = createMessageRouter({ WS_handlers, logger, });

    const connectionHandler = createConnectionHandler({ messageRouter: router, logger, });

    wss.on("connection", connectionHandler);

    
    async function verifyDatabase() {
        try {
            await pool.query("SELECT NOW()");
            // console.log("Connected to PostgreSQL.");
            logger.info("Connected to PostgreSQL.");
        } catch (error) {
            logger.error({ err, }, "Database connection failed");
        } 
    }

    let started = false;
    async function startHttpServer() {
        return new Promise((resolve) => {
            server.listen(env.app.port, () => {
                // console.log(`Server is listening on port: ${env.app.port}`);
                logger.info(`Server is listening on port: ${env.app.port}`);
                logger.info({ port: env.app.port, }, "HTTP server started");
                started = true;
                resolve();
            });
        });
    }

    async function stopHttpServer() {
        if (!started) {
            await pool?.end();
            return;
        }
        for (const client of wss?.clients) {
            client?.close();
        }
        await new Promise((resolve, reject) => {
            server?.close(err => {
                if (err) return reject(err);
                started = false;
                resolve();
            });
        });
    }

    async function start() {
        await verifyDatabase();
        await startHttpServer();
    }

    async function stop() {
        await stopHttpServer();
        await pool?.end();
    }

    return {
        app,
        start,
        stop,
        pool,
    };

}