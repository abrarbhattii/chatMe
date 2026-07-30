const validate = require("../middleware/validate");
const webSocketMessageSchema = require("../features/chat/schema/createWebSocketMessage");


module.exports = function createConnectionHandler({ messageRouter, logger, }) {

    // function handleConnection(socket, req, wss)
    return function handleConnection(socket) {
        
        logger.info("WebSocket client connected");
        
        socket.on("message", async buffer => {
            try {
                const message = JSON.parse(buffer.toString());
                // logger.info({message}, "message buffer")
                const validatedMessage = webSocketMessageSchema.parse(message);
                // logger.info({validatedMessage}, "validatedMessage")
                await messageRouter(socket, { ...validatedMessage, type: "chat_message"});
            } catch (err) {
                logger.warn({ error: err.Message }, "Invalid WebSocket JSON");
                socket.send(JSON.stringify({
                    type: "error",
                    payload: {
                        message: err.message,
                    },
                }));
            }
        });

        socket.on("close", () => {
            logger.info("WebSocket client disconnected");
        });

        socket.on("error", (err) => {
            logger.error({ err }, "WebSocket connection error");
        });

    }

}