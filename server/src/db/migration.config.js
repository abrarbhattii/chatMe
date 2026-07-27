require("dotenv").config();

module.exports = {
    direction: "up",
    migrationsTable: "pgmigrations",
    dir: "src/db/migrations",
    databaseUrl: process.env.DATABASE_URL,
};