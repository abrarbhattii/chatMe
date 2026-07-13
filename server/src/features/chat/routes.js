const express = require("express");

module.exports = function createChatRoutes({ chatController, }) {

    const router = express.Router();
    
    router.get("/conversations/:conversationId/messages", chatController.getMessages);
    router.post("/conversations/:conversationId/messages", chatController.createMessage);

    return router;
};