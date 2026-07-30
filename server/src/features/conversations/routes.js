const express = require("express");
const validate = require("../../middleware/validate");
const createDirectConversationSchema = require("./schema/createDirectConversation");
const getConversationSchema = require("./schema/getConversation");

module.exports = function createRoutes({ conversationController, }) {
    const router = express.Router();
    router.get("/user/:userId", conversationController.getUserConversations);
    router.get("/", conversationController.getUserConversations);
    router.get("/:conversationId", validate(getConversationSchema), conversationController.getConversation);
    // router.post("/direct", conversationController.createDirectConversation);
    router.post("/direct", validate(createDirectConversationSchema), conversationController.createDirectConversation);
    return router;
};