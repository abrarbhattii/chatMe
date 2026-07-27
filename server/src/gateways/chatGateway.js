const { WebSocket } = require("ws");

module.exports = function createChatGateway({ wss, }) {

    function broadcast(event) {
        const json = JSON.stringify(event);
        wss.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                console.log("json: ", json);
                client.send(json);
            }
        });
    }

    return {
        broadcast,
    };

};