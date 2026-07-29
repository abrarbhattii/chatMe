const express = require("express");
const validate = require("../../middleware/validate");
const createMessageSchema = require("./schema/createMessage");

module.exports = function createChatRoutes({ chatController, }) {

    const router = express.Router();
    
    router.get("/conversations/:conversationId/messages", chatController.getMessages);
    // router.post("/conversations/:conversationId/messages", chatController.createMessage);
    router.post("/conversations/:conversationId/messages", validate(createMessageSchema), chatController.createMessage);

    return router;
};