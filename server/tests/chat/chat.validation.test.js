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

test("Rejects empty message", async()=>{
    const res =
        await request(application.app)
        .post("/api/v1/conversations/1/messages")
        .send({
            senderId: 1,
            content: ""
        });
    expect(res.status).toBe(400);
});