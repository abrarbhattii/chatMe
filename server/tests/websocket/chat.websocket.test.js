const WebSocket = require("ws");
const application = require("../setup");
const resetDatabase = require("../../src/db/helpers/resetDatabase");
const { connect, waitForMessage, disconnect } = require("../helpers/websocketClient");
const env = require("../../src/config/env");

describe("WebSocket Connection", () => {

    let ws_url = `ws://localhost:${env.app.port}`;

    beforeEach(async () => {
        await resetDatabase(application.pool);
    });

    beforeAll(async () => {
        await application.start();
    });

    afterAll(async () => {
        await application.stop();
    });

    test("Client connects successfully", () => {
        return new Promise((resolve, reject) => {
            const socket = new WebSocket(ws_url);
            socket.on("open", () => {
                socket.close();
                resolve();
            });
            socket.on("error", reject);
        });
    });

    test("Send Message", async () => {
        const socket = await connect(ws_url);
        socket.send(JSON.stringify( {conversationId : 1, senderId: 3, content: "Hello WS"}));  //{conversationId, senderId, content}
        const message = await waitForMessage(socket);
        expect(message.type).toBe("chat_message");
        expect(message.payload.conversation_id).toBe(1);
        expect(message.payload.content).toBe("Hello WS");
        await disconnect(socket);
    });

    test("Broadcast", async () => {
        const sender = await connect(ws_url);
        const receiver = await connect(ws_url);
        sender.send(JSON.stringify({conversationId : 1, senderId: 3, content: "Hello reciever"}));
        const message = await waitForMessage(receiver);
        expect(message.type).toBe("chat_message");
        expect(message.payload.conversation_id).toBe(1);
        expect(message.payload.content).toBe("Hello reciever");
        await disconnect(sender);
        await disconnect(receiver);
    });


    test("Invalid Payload", async () => {
        const socket = await connect(ws_url);
        socket.send(JSON.stringify({
            "type": "chat_message",
            "payload": {}
        }));
        const message = await waitForMessage(socket);
        expect(message.type).toEqual("error");
        await disconnect(socket);
    });

});