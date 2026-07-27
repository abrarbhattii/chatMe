module.exports = function createChatController({ chatService, }) {

    async function getMessages(req, res, next) {
        try {
            const messages = await chatService.getMessages();
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
            console.log("req.body: ", req.body)
            const { userId, content } = req.body;
            const message = await chatService.sendMessage({ userId, content });
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