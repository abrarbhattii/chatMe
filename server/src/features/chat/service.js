const ValidationError = require("../../shared/errors/ValidationError");

module.exports = function createChatService({ chatRepository, }) {

    async function sendMessage({ conversationId, senderId, content }) {

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
        return chatRepository.getMessages(conversationId);
    }

    return {
        sendMessage,
        getMessages,
    };
};