const { z } = require("zod");

module.exports = z.object({
    
    params: z.object({
        conversationId: z.string().transform(Number).pipe(z.number().int().positive()),
    }).strict(),

});