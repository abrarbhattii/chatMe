const express = require("express");

module.exports = function createChatRoutes({ chatController, }) {

    const router = express.Router();
    
    router.get("/", chatController.getMessages);
    router.post("/", chatController.createMessage);

    return router;
};