module.exports = function validate(schema) {

    return function(req, res, next) {
        try {
            const data = schema.parse({
                body: req.body,
                params: req.params,
                query: req.query,
            });
            req.validated = data;
            next();
        } catch (error) {
            next(error);
        }
    };
};