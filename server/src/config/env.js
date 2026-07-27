module.exports = {
    app: {
        port: Number(process.env.PORT) || 3000,
        nodeEnv: process.env.NODE_ENV || "development",
    },

    database: {
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        database: process.env.DB_NAME,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
    },

    jwt: {
        secret: process.env.JWT_SECRET,
        expiresIn: process.env.JWT_EXPIRES_IN,
    },
};



// for JWT
// const env = require("../config/env");
// jwt.sign(payload, env.jwt.secret);

//prevents mysterious runtime failures
// if (!process.env.JWT_SECRET)
//     throw new Error("JWT_SECRET is required.");