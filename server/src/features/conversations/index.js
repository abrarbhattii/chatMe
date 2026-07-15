const createRepository = require("./repository");
const createService = require("./service");
const createController = require("./controller");
const createRoutes = require("./routes");

module.exports = function createConversationModule({ pool, }) {

    const repository = createRepository({ pool });

    const service = createService({
        conversationRepository: repository,
    });

    const controller = createController({
        conversationService: service,
    });

    const routes = createRoutes({
        conversationController: controller,
    });

    return {
        httpRoutes: routes,
    };

};