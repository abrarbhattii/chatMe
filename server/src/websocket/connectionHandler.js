module.exports = function createConnectionHandler({ messageRouter, }) {

    // function handleConnection(socket, req, wss)
    return function handleConnection(socket) {
        
        socket.on("message", async buffer => {
            try {
                const message = JSON.parse(buffer.toString());
                await messageRouter(socket, { conversationId: 1, senderId: 3, content: message, type: "chat_message"});
            } catch (err) {
                socket.send(JSON.stringify({
                    type: "error",
                    payload: {
                        message: err.message,
                    },
                }));
            }
        });

    }

}