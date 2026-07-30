const request = require("supertest");
const application = require("../setup");
const resetDatabase = require("../../src/db/helpers/resetDatabase");

beforeEach(async () => {
    await resetDatabase(application.pool);
});

beforeAll(async () => {
    await application.start();
});

afterAll(async () => {
    await application.stop();
});

describe("Messages API http Tests", () => {

    test("Returns existing direct conversation", async () => {
        const response =
            await request(application.app)
                .post("/api/v1/conversations/direct")
                .send({
                    creatorId: 3,
                    participantId: 4,
                });
        expect(response.status).toBe(201);
        expect(response.body.data.type).toBe("DIRECT");
        expect(response.body.data.id).toBe(1);
    });
    

    test("Creates new direct conversation", async () => {
        const response =
            await request(application.app)
                .post("/api/v1/conversations/direct")
                .send({
                    creatorId: 1,
                    participantId: 3,
                });
        expect(response.status).toBe(201);
        expect(response.body.data.type).toBe("DIRECT");
        expect(response.body.data.id).toBe(2);
    });


    test("Returns conversations for a user", async () => {
        const response = await request(application.app)
            .get("/api/v1/conversations/user/3");
        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(Array.isArray(response.body.data)).toBe(true);
        expect(response.body.data.length).toBeGreaterThan(0);
    });


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