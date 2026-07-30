const NotFoundError = require("../../shared/errors/NotFoundError");

module.exports = function createConversationService({ conversationRepository, logger, }) {

    async function getConversation(conversationId) {
        const conversation = await conversationRepository.findConversationById(conversationId);
        if (!conversation) {
            throw new NotFoundError("Conversation not found");
        }
        return conversation;
    }

    async function getUserConversations(userId) {
        const conversations = await conversationRepository.findConversationsByUser(userId);
        return conversations.map((conversation) => ({
            conversationId: conversation.id,
            conversationType: conversation.type,
            displayName: 
                conversation.type === "DIRECT" 
                    ? conversation.participant_username 
                        : conversation.name,
            createdAt: conversation.created_at,
            participants: {
                creatorId: userId, 
                participantId: conversation.participant_id,
                participantUsername: conversation.participant_username,
            },
            lastMessage: {
                messageId: conversation.last_message_id,
                messageSender: conversation.last_message_sender,
                MessageContent: conversation.last_message,
                createdAt: conversation.last_message_at,    
            },
        }));
    }

    async function createDirectConversation({ creatorId, participantId, }) {
        const existingConversation = await conversationRepository.findDirectConversation({ creatorId, participantId, })

        if (existingConversation) {
            logger.info({ conversationId: existingConversation.id, creatorId }, "Existing Conversation returned");
            return existingConversation;
        } 

        const conversation = await conversationRepository.createDirectConversation({ creatorId, participantId, });

        logger.info({ conversationId: conversation.id, creatorId }, "Conversation created");

        return conversation;
    }

    return {
        createDirectConversation,
        getUserConversations,
        getConversation,
    };

}