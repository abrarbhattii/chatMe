const ValidationError = require("../../shared/errors/ValidationError");

module.exports = function createChatService({ chatRepository, }) {

    async function sendMessage({ userId, content, }) {

        if (!Number.isInteger(userId)) {
            throw new ValidationError("Invalid userId.");
        }

        if (!content?.trim()) {
            throw new ValidationError("Message cannot be empty.");
        }

        if (content.length > 1000) {
            throw new ValidationError("Message exceeds 1000 characters.");
        }

        return chatRepository.create({ userId, content: content.trim(), });
    }

    async function getMessages() {
        return chatRepository.getAll();
    }

    return {
        sendMessage,
        getMessages,
    };
};