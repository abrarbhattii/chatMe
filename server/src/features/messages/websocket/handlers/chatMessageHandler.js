module.exports = function createChatMessageHandler({ messageService, chatMessageGateway, logger, }) {

    return async function handleChatMessage(socket, payloadValidatedMessageObject) {
        // console.log("payloadValidatedMessageObject: ", payloadValidatedMessageObject);
        // logger.info({ payloadValidatedMessageObject }, "payloadValidatedMessageObject: ");
        // const message = await messageService.sendMessage(payloadValidatedMessageObject);
        const message = await messageService.sendMessage({
            conversationId: payloadValidatedMessageObject.conversationId, 
            senderId: payloadValidatedMessageObject.senderId, 
            content: payloadValidatedMessageObject.content
        });
        // logger.info({ message }, "message: ");
        // socket.send(JSON.stringify({
        //     type: "chat_message",
        //     payload: message,
        // }));
        chatMessageGateway.broadcast({ type: payloadValidatedMessageObject.type, payload: message, });
    };

};