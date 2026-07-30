require("dotenv").config();
const createApplication = require("../src/bootstrap/createApplication");

async function main() {
    try {
        const PORT = process.env.PORT || 3000;
        const application = createApplication();
        await application.start();
    } catch (err) {
        // console.error("Failed to start server:", err.message);
        logger.fatal({ err }, "Application failed to start");
        console.error("Error:", err);
        await application.stop();
        process.exit(1);
    }
}

main();