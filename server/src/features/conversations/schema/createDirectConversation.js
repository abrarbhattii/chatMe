const { z } = require("zod");

module.exports = z.object({

    body: z.object({
        creatorId: z.number().int().positive(),
        participantId: z.number().int().positive(),
    }),

});