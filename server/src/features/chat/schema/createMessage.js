const { z } = require("zod");

module.exports = z.object({

    body: z.object({
        senderId: z.number().int().positive(),
        content: z.string().trim().min(1).max(1000),
    }),

    params: z.object({
        conversationId: z.string().transform(Number).pipe(z.number().int().positive()),
    }),

});