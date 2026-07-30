module.exports = function createMessageRouter({ WS_handlers, logger, }) {

    return async function route(socket, validatedMessageObject) {
        const handler = WS_handlers[validatedMessageObject.type];

        if (!handler) {
            logger.warn({ type, }, "Unknown websocket message type");
            throw new Error(`Unsupported message: ${validatedMessageObject.type}`);
        }

        await handler(socket, validatedMessageObject);
    };

};