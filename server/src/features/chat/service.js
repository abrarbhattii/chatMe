const ValidationError = require("../../shared/errors/ValidationError");
const NotFoundError = require("../../shared/errors/NotFoundError");

module.exports = function createChatService({ chatRepository, }) {

    async function sendMessage({ conversationId, senderId, content }) {

        const exists = await chatRepository.exists(conversationId);

        if (!exists) {
            throw new NotFoundError("Conversation not found.");
        }

        if (!Number.isInteger(conversationId)) {
            throw new ValidationError("Invalid conversation.");
        }

        if (!Number.isInteger(senderId)) {
            throw new ValidationError("Invalid senderId.");
        }

        if (!content?.trim()) {
            throw new ValidationError("Message cannot be empty.");
        }

        if (content.length > 1000) {
            throw new ValidationError("Message exceeds 1000 characters.");
        }

        return chatRepository.create({ conversationId, senderId, content: content.trim(), });
    }

    async function getMessages(conversationId) {
        const exists = await chatRepository.exists(conversationId);

        if (!exists) {
            throw new NotFoundError("Conversation not found.");
        }

        return chatRepository.getMessages(conversationId);
    }

    return {
        sendMessage,
        getMessages,
    };
};