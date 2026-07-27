const { Pool } = require("pg");
const env = require("./env");

module.exports = function createDatabasePool() {
    console.log("env: ", env)
    return new Pool(env.database);
};

