const createRepository = require("./repository");
const createService = require("./service");
const createController = require("./controller");
const createRoutes = require("./routes");

const createChatMessageHandler = require("./websocket/handlers/chatMessageHandler");

module.exports = function createMessagesModule({ pool, chatMessageGateway, logger, }) {

    const repository = createRepository({ pool, logger, });

    const service = createService({ messageRepository: repository, chatMessageGateway, logger, });

    const controller = createController({ messageService: service, logger, });

    const httpRoutes = createRoutes({ messageController: controller });

    const websocketHandlers = { 
        chat_message: createChatMessageHandler({messageService: service, chatMessageGateway, logger, }) 
    };

    return {
        httpRoutes,
        websocketHandlers
    };

};