const createRepository = require("./repository");
const createService = require("./service");
const createController = require("./controller");
const createRoutes = require("./routes");

const createChatMessageHandler = require("./websocket/handlers/chatMessageHandler");

module.exports = function createChatModule({ pool, chatGateway }) {

    const repository = createRepository({ pool });

    const service = createService({ chatRepository: repository });

    const controller = createController({ chatService: service });

    const httpRoutes = createRoutes({ chatController: controller });

    const websocketHandlers = { 
        chat_message: createChatMessageHandler({ chatService: service, chatGateway }) 
    };

    return {
        httpRoutes,
        websocketHandlers
    };

};