const fs = require("fs/promises");

module.exports = async function resetDatabase(pool) {

    const schema = await fs.readFile("./src/db/schema.sql", "utf8");
    const seed = await fs.readFile("./src/db/seed.sql", "utf8");
    await pool.query(schema);
    await pool.query(seed);

};