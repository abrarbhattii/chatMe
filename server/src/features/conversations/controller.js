module.exports = function createConversationController({ conversationService, logger, }) {

    async function getUserConversations(req, res, next) {
        try {
            const userId = Number(req.params.userId);

            const conversations =
                await conversationService
                    .getUserConversations(userId);

            res.json({
                success: true,
                data: conversations,
            });
        } catch (err) {
            console.log(err)
            next(err);
        }

    }

    async function createDirectConversation(req, res, next) {
        try {
            const { creatorId, participantId } = req.validated.body;
            
            const conversation =
                await conversationService
                    .createDirectConversation({ creatorId, participantId });
            
            logger.info({conversation}, "conversation");

            res.status(201).json({
                success: true,
                data: conversation,
            });
        } catch (err) {
            next(err);
        }
    }

    return {
        createDirectConversation,
        getUserConversations,
    };

}