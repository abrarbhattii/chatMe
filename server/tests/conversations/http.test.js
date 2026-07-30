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

    test("Get user conversations query", async () => {
        const res = await request(application.app)
            .get("/api/v1/conversations")
            .query({
                userId: 1
            });
        expect(res.status).toBe(200);
        expect(Array.isArray(res.body.data)).toBe(true);
    });

    test("Get user conversations", async () => {
        const res = await request(application.app)
            .get("/api/v1/conversations?userId=1")
        expect(res.status).toBe(200);
        expect(Array.isArray(res.body.data)).toBe(true);
    });

    test("Get conversation details", async () => {
        const res = await request(application.app)
            .get("/api/v1/conversations/1");
        expect(res.status).toBe(200);
        expect(res.body.data.id).toBe(1);
    });

    test("Unknown conversation", async () => {
        const res = await request(application.app)
            .get("/api/v1/conversations/999");
        expect(res.status).toBe(404);
    });

});