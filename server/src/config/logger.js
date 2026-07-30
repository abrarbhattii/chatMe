const pino = require("pino");
const env = require("./env");

module.exports = function createLogger() {
    return pino({

        // => Log level hierarchy
        // tracedebug, info, warn, error, fatal
        // => Choosing "info" means
        // trace ❌, debug ❌, info ✔, warn ✔, error ✔, fatal ✔
        // => Choosing "debug" means
        // trace ❌, debug ✔, info ✔, warn ✔, error ✔, fatal ✔
        level: env.app.nodeEnv === "production"
            ? "info"
            : "debug",
            
        transport:
            env.app.nodeEnv === "production"
                ? undefined
                : {
                    target: "pino-pretty",
                    options: {
                        colorize: true,
                        translateTime: "SYS:standard",
                        ignore: "pid,hostname",
                    },
                },
    });
};