const createDatabasePool = require("../../config/postgres");
const seeds = require("../seeds");
const env = require("../../config/env");

async function run() {
    const pool = createDatabasePool();
    try {
        console.log("env.app.nodeEnv: ", env.app.nodeEnv)
         const environment =
            env.app.nodeEnv === "test"
                ? "test"
                : "development";
        console.log("environment: ", environment)
        console.log("seeds[environment]: ", seeds[environment])
        await seeds[environment](pool);
        console.log(`Database seeded successfully with (${environment}).`);
    } catch (err) {
        console.error("Failed to seed database.");
        console.error(err);
        process.exitCode = 1;
    } finally {
        await pool.end();
    }
}

run();