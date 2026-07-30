const express = require("express");
const validate = require("../../middleware/validate");
const createDirectConversationSchema = require("./schema/createDirectConversation");

module.exports = function createRoutes({ conversationController, }) {
    const router = express.Router();
    router.get("/user/:userId", conversationController.getUserConversations);
    router.get("/", conversationController.getUserConversations);
    // router.post("/direct", conversationController.createDirectConversation);
    router.post("/direct", validate(createDirectConversationSchema), conversationController.createDirectConversation);
    return router;
};