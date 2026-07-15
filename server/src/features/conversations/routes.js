const express = require("express");

module.exports = function createRoutes({ conversationController, }) {
    const router = express.Router();
    router.get("/user/:userId", conversationController.getUserConversations);
    router.post("/direct", conversationController.createDirectConversation);
    return router;
};