require("dotenv").config();
const createApplication = require("../src/bootstrap/createApplication");

async function main() {
    try {
        const PORT = process.env.PORT || 3000;
        const application = createApplication();
        await application.start();
    } catch (err) {
        console.error("Failed to start server:", err.message);
        console.error("Error:", err);
        process.exit(1);
    }
}

main();