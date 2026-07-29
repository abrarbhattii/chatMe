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
        .post("/api/v1/conversations/direct")
        .send({
            creatorId: 3,
            participantId: "4",
        });
    expect(res.status).toBe(400);

    const res1 =
        await request(application.app)
        .post("/api/v1/conversations/direct")
        .send({
            creatorId: "3",
            participantId: "4",
        });
    expect(res1.status).toBe(400);

    const res2 =
        await request(application.app)
        .post("/api/v1/conversations/direct")
        .send({
            creatorId: "3",
            participantId: 4,
        });
    expect(res2.status).toBe(400);

    const res3 =
        await request(application.app)
        .post("/api/v1/conversations/direct")
        .send({
            creatorId: 3,
            participantId: 4,
        });
    expect(res3.status).toBe(201);
    expect(res3.body.data.type).toBe("DIRECT");
    expect(res3.body.data.id).toBe(1);
});