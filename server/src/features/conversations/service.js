module.exports = function createConversationService({ conversationRepository, }) {

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
            lastMessage: {
                content: conversation.last_message,
                createdAt: conversation.last_message_at,
            },
        }));
    }

    async function createDirectConversation({ creatorId, participantId, }) {
        const existingConversation = await conversationRepository.findDirectConversation({ creatorId, participantId, })
        if (existingConversation) 
            return existingConversation;
        return conversationRepository.createDirectConversation({ creatorId, participantId, });
    }

    return {
        createDirectConversation,
        getUserConversations,
    };

}