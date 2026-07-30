module.exports = function createConversationController({ conversationService, logger, }) {

    async function getConversation(req, res, next) {
        try {
            const conversationId = Number(req.params.conversationId);
            const conversation = await conversationService.getConversation(conversationId);
            res.json({
                success: true,
                data: conversation,
            });
        } catch (err) {
            logger.error({err}, "error: ")
            next(err);
        }
    }

    async function getUserConversations(req, res, next) {
        try {
            const userId = Number(req.params.userId || req.query.userId);

            if (!Number.isInteger(userId) || userId <= 0) {
                return res.status(400).json({
                    success: false,
                    error: "Invalid userId"
                });
            }

            const conversations = await conversationService.getUserConversations(userId);

            res.json({
                success: true,
                data: conversations,
            });
        } catch (err) {
            logger.error({err}, "error: ")
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
        getConversation,
    };

}