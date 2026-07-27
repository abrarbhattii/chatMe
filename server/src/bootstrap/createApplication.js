const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const http = require("http");
const { WebSocketServer } = require("ws");


const createDatabasePool = require("../config/database");
const createChatGateway = require("../gateways/chatGateway");

const createChatModule = require("../features/chat");

const createMessageRouter = require("../websocket/messageRouter");
const createConnectionHandler = require("../websocket/connectionHandler");


const healthRoutes = require("../features/health/health.routes");

const errorHandler = require("../middleware/errorHandler");

const env = require("../config/env");



module.exports = function createApplication() {

    const app = express();
    
    app.use(cors());
    app.use(express.json());
    app.use(morgan("dev"));

    const server = http.createServer(app);

    const wss = new WebSocketServer({ server, });

    const pool = createDatabasePool();

    const chatGateway = createChatGateway({ wss, });

    const chat = createChatModule({ pool, chatGateway, });
    
    app.use("/api/v1/health", healthRoutes);

    app.use("/api/v1/messages", chat.httpRoutes);

    app.use(errorHandler);

    const WS_handlers = { ...chat.websocketHandlers, };

    const router = createMessageRouter({ WS_handlers, });

    const connectionHandler = createConnectionHandler({ messageRouter: router, });

    wss.on("connection", connectionHandler);

    
    async function verifyDatabase() {
        await pool.query("SELECT NOW()");
        console.log("Connected to PostgreSQL.");
    }

    async function startHttpServer() {
        return new Promise((resolve) => {
            server.listen(env.app.port, () => {
                console.log(`Server is listening on port: ${env.app.port}`);
                resolve();
            });
        });
    }

    async function stopHttpServer() {
        await new Promise((resolve, reject) => {
            server.close(err => {
                if (err) return reject(err);
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
        await pool.end();
    }

    return {
        start,
        stop,
    };

}