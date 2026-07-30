const createRepository = require("./repository");
const createService = require("./service");
const createController = require("./controller");
const createRoutes = require("./routes");

module.exports = function createConversationModule({ pool, logger, }) {

    const repository = createRepository({ pool, logger, });

    const service = createService({
        conversationRepository: repository,
        logger,
    });

    const controller = createController({
        conversationService: service,
        logger,
    });

    const routes = createRoutes({
        conversationController: controller,
    });

    return {
        httpRoutes: routes,
    };

};