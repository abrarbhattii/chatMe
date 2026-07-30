module.exports = function createChatController({ chatService, logger, }) {

    async function getMessages(req, res, next) {
        try {
            const conversationId = Number(req.params.conversationId);
            const messages = await chatService.getMessages(conversationId);
            res.json({
                success: true,
                data: messages,
            });
        } catch (err) {
            next(err);
        }
    }

    async function createMessage(req, res, next) {
        try {
            const { conversationId } = req.validated.params;
            // console.log("req.validated.body: ", req.validated.body);
            // logger.info({req: req.validated.body},`req.validated.body`);
            const { senderId, content } = req.validated.body;
            const message = await chatService.sendMessage({ conversationId, senderId, content });
            // const message = await chatService.sendMessage(req.body);
            // logger.info({message}, `message:`);
            // console.log("message: ", message);
            res.status(201).json({
                success: true,
                data: message,
            });
        } catch (err) {
            next(err);
        }
    }

    return {
        getMessages,
        createMessage,
    };
};