const { WebSocket } = require("ws");

module.exports = function createChatGateway({ wss, logger, }) {

    function broadcast(event) {
        try {
            logger.info("Broadcasting Message");
            const json = JSON.stringify(event);
            wss.clients.forEach(client => {
                if (client.readyState === WebSocket.OPEN) {
                    // console.log("json: ", json);
                    // logger.info({ json }, "json: ");
                    client.send(json);
                }
            });
            logger.info("Message broadcasted");
        } catch (error) {
            logger.error({ error }, "Failed to broadcast websocket message");
        }
    }

    return {
        broadcast,
    };

};