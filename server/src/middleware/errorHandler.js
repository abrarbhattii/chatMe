const { ZodError } = require("zod");

module.exports = function errorHandler(err, req, res, next) {
    if(err instanceof ZodError){
        return res.status(400).json({
            success: false,
            error: {
                message: "Validation failed",
                details: err.errors
            }
        });
    }

    const status = err.statusCode || 500;
    res.status(status).json({
        success: false,
        error: {
            message: err.message,
        },
    });
};