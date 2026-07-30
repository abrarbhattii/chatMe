const { z } = require("zod");

module.exports = z.object({

    body: z.object({
        senderId: z.number().int().positive(),
        content: z.string().trim().min(1).max(1000),
    }).strict(),

    params: z.object({
        conversationId: z.string().transform(Number).pipe(z.number().int().positive()),
    }).strict(),

    // query: z.object({
    //     page: z.coerce.number().int().min(1).default(1),
    //     limit: z.coerce.number().int().min(1).max(100).default(20),
    // }).strict(),

});