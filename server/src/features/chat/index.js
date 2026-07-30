const createRepository = require("./repository");
const createService = require("./service");
const createController = require("./controller");
const createRoutes = require("./routes");

const createChatMessageHandler = require("./websocket/handlers/chatMessageHandler");

module.exports = function createChatModule({ pool, chatGateway, logger, }) {

    const repository = createRepository({ pool, logger, });

    const service = createService({ chatRepository: repository, chatGateway, logger, });

    const controller = createController({ chatService: service, logger, });

    const httpRoutes = createRoutes({ chatController: controller });

    const websocketHandlers = { 
        chat_message: createChatMessageHandler({ chatService: service, chatGateway, logger, }) 
    };

    return {
        httpRoutes,
        websocketHandlers
    };

};