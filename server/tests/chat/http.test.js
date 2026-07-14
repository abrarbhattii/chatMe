const request = require("supertest");
const application = require("../setup");
const resetDatabase = require("../helpers/resetDatabase");

beforeEach(async () => {
    await resetDatabase(application.pool);
});

describe("Chat API", () => {

    test("GET conversation messages", async () => {
        const res = await request(application.app)
            .get("/api/v1/conversations/1/messages");
        expect(res.status).toBe(200);
        expect(res.body.success).toBe(true);
        expect(Array.isArray(res.body.data)).toBe(true);
    });


    test("Create message", async () => {
        const res = await request(application.app)
            .post("/api/v1/conversations/1/messages")
            .send({
                senderId: 1,
                content: "Integration Test"
            });
        expect(res.status).toBe(201);
        expect(res.body.success).toBe(true);
        expect(res.body.data.content).toBe("Integration Test");
    });

    test("Unknown conversation", async () => {
        const res = await request(application.app).get("/api/v1/conversations/999/messages");
        expect(res.status).toBe(404);
    });

});