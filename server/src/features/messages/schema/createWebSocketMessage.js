const { z } = require("zod");

module.exports = z.object({
    conversationId: z.number().int().positive(),
    senderId: z.number().int().positive(),
    content: z.string().trim().min(1).max(1000)
});