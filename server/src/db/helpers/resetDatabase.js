// const fs = require("fs/promises");

// module.exports = async function resetDatabase(pool) {

//     const schema = await fs.readFile("./src/db/schema.sql", "utf8");
//     const seed = await fs.readFile("./src/db/seed.sql", "utf8");
//     await pool.query(schema);
//     await pool.query(seed);

// };




// module.exports = async function resetDatabase({ migrate, seed, }) {
//     await migrate();
//     await seed();
// }


const createPool = require("../../config/postgres");
const seeds = require("../seeds");

module.exports = async function resetDatabase() {

    const pool = createPool();

    try {

        await seeds.test(pool);

    } finally {

        await pool.end();

    }

};