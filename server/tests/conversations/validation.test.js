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


test("Rejects missing creatorId", async () => {
    const res = await request(application.app)
        .post("/api/v1/conversations/direct")
        .send({
            participantId: 2
        });
    expect(res.status).toBe(400);
});


test("Rejects missing creatorId", async () => {
    const res = await request(application.app)
        .post("/api/v1/conversations/direct")
        .send({
            participantId: 2
        });
    expect(res.status).toBe(400);
});


test("Rejects invalid creatorId", async () => {
    const res = await request(application.app)
        .post("/api/v1/conversations/direct")
        .send({
            creatorId: "abc",
            participantId: 2
        });
    expect(res.status).toBe(400);
});


test("Rejects negative participantId", async () => {
    const res = await request(application.app)
        .post("/api/v1/conversations/direct")
        .send({
            creatorId: 1,
            participantId: -1
        });
    expect(res.status).toBe(400);
});


test("Returns exisitng valid direct conversation", async () => {
    const res = await request(application.app)
        .post("/api/v1/conversations/direct")
        .send({
            creatorId: 4,
            participantId: 3
        });
    expect(res.status).toBe(201);
    expect(res.body.data.type).toBe("DIRECT");
    expect(res.body.data.id).toBe(1);
});


test("Creates a valid direct conversation", async () => {
    const res = await request(application.app)
        .post("/api/v1/conversations/direct")
        .send({
            creatorId: 1,
            participantId: 3
        });
    expect(res.status).toBe(201);
    expect(res.body.data.type).toBe("DIRECT");
    expect(res.body.data.id).toBe(2);
});


test("Rejects unexpected properties", async () => {
    const res = await request(application.app)
        .post("/api/v1/conversations/1/messages")
        .send({
            senderId: 1,
            content: "Hello",
            hackerField: true
        });
    expect(res.status).toBe(400);
});