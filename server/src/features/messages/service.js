const ValidationError = require("../../shared/errors/ValidationError");
const NotFoundError = require("../../shared/errors/NotFoundError");

module.exports = function createMessageService({ messageRepository, chatMessageGateway, logger, }) {

    async function sendMessage({ conversationId, senderId, content }) {

        try {
            const exists = await messageRepository.exists(conversationId);

            if (!exists) {
                throw new NotFoundError("Conversation not found.");
            }

            // if (!Number.isInteger(conversationId)) {
            //     throw new ValidationError("Invalid conversation.");
            // }

            // if (!Number.isInteger(senderId)) {
            //     throw new ValidationError("Invalid senderId.");
            // }

            // if (!content?.trim()) {
            //     throw new ValidationError("Message cannot be empty.");
            // }

            // if (content.length > 1000) {
            //     throw new ValidationError("Message exceeds 1000 characters.");
            // }

            logger.debug({ senderId, conversationId, }, "Creating message");

            const createdMessage = await messageRepository.createMessage({ conversationId, senderId, content: content.trim(), });

            logger.info({ messageId: createdMessage.id, conversationId, }, "Message created & stored");

            return createdMessage;

        } catch (error) {
            logger.warn({ error, conversationId, }, "Conversation has no connected clients");
            return;
        }
    }

    async function getMessages(conversationId) {
        const exists = await messageRepository.exists(conversationId);

        if (!exists) {
            throw new NotFoundError("Conversation not found.");
        }

        return messageRepository.getMessages(conversationId);
    }

    return {
        sendMessage,
        getMessages,
    };
};