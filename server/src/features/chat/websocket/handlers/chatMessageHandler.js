module.exports = function createChatMessageHandler({ chatService, chatGateway, logger, }) {

    return async function handleChatMessage(socket, payloadValidatedMessageObject) {
        // console.log("payloadValidatedMessageObject: ", payloadValidatedMessageObject);
        // logger.info({ payloadValidatedMessageObject }, "payloadValidatedMessageObject: ");
        // const message = await chatService.sendMessage(payloadValidatedMessageObject);
        const message = await chatService.sendMessage({
            conversationId: payloadValidatedMessageObject.conversationId, 
            senderId: payloadValidatedMessageObject.senderId, 
            content: payloadValidatedMessageObject.content
        });
        // logger.info({ message }, "message: ");
        // socket.send(JSON.stringify({
        //     type: "chat_message",
        //     payload: message,
        // }));
        chatGateway.broadcast({ type: payloadValidatedMessageObject.type, payload: message, });
    };

};