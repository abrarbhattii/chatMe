module.exports = function createMessageRouter({ WS_handlers, }) {

    return async function route(socket, message) {
        const handler = WS_handlers[message.type];

        if (!handler) {
            throw new Error(`Unsupported message: ${message.type}`);
        }

        await handler(socket, message);
    };

};