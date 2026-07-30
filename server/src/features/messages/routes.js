const express = require("express");
const validate = require("../../middleware/validate");
const createMessageSchema = require("./schema/createHttpMessage");

module.exports = function createMessageRoutes({ messageController, }) {

    const router = express.Router();
    
    router.get("/conversations/:conversationId/messages", messageController.getMessages);
    // router.post("/conversations/:conversationId/messages", messageController.createMessage);
    router.post("/conversations/:conversationId/messages", validate(createMessageSchema), messageController.createMessage);

    return router;
};