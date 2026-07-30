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


test("Rejects missing content", async () => {
    const res = await request(application.app)
        .post("/api/v1/conversations/1/messages")
        .send({
            senderId: 1
        });
    expect(res.status).toBe(400);
});


test("Rejects missing senderId", async () => {
    const res = await request(application.app)
        .post("/api/v1/conversations/1/messages")
        .send({
            content: "Hello"
        });
    expect(res.status).toBe(400);
});


test("Rejects invalid senderId type", async () => {
    const res = await request(application.app)
        .post("/api/v1/conversations/1/messages")
        .send({
            senderId: "abc",
            content: "Hello"
        });
    expect(res.status).toBe(400);
});


test("Rejects negative senderId", async () => {
    const res = await request(application.app)
        .post("/api/v1/conversations/1/messages")
        .send({
            senderId: -5,
            content: "Hello"
        });
    expect(res.status).toBe(400);
});


test("Rejects invalid conversationId parameter", async () => {
    const res = await request(application.app)
        .post("/api/v1/conversations/abc/messages")
        .send({
            senderId: 1,
            content: "Hello"
        });
    expect(res.status).toBe(400);
});


test("Rejects messages longer than 1000 characters", async () => {
    const res = await request(application.app)
        .post("/api/v1/conversations/1/messages")
        .send({
            senderId: 1,
            content: "A".repeat(1001)
        });
    expect(res.status).toBe(400);
});


// Because schema uses:
// z.string().trim().min(1)
// this should fail.
test("Rejects whitespace-only messages", async () => {
    const res = await request(application.app)
        .post("/api/v1/conversations/1/messages")
        .send({
            senderId: 1,
            content: "     "
        });
    expect(res.status).toBe(400);
});


test("Accepts a valid message", async () => {
    const res = await request(application.app)
        .post("/api/v1/conversations/1/messages")
        .send({
            senderId: 1,
            content: "Hello"
        });
    expect(res.status).toBe(201);
});

