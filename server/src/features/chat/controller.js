module.exports = function createChatController({ chatService, }) {

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
            const conversationId = Number(req.params.conversationId);
            console.log("req.body: ", req.body)
            const { senderId, content } = req.body;
            const message = await chatService.sendMessage({ conversationId, senderId, content });
            // const message = await chatService.sendMessage(req.body);
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