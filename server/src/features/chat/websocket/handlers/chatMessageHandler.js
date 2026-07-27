module.exports = function createChatMessageHandler({ chatService, chatGateway, }) {

    return async function handle(socket, payload) {
        const message = await chatService.sendMessage(payload);
        console.log("payload: ", payload);
        // socket.send(JSON.stringify({
        //     type: "chat_message",
        //     payload: message,
        // }));
        chatGateway.broadcast({ type: "chat_message", payload: message, });
    };

};