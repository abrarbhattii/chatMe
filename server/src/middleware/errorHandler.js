module.exports = function errorHandler(err, req, res, next) {
    const status = err.statusCode || 500;
    res.status(status).json({
        success: false,
        error: {
            message: err.message,
        },
    });
};