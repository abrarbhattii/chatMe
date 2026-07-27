const { Pool } = require("pg");
const env = require("./env");

module.exports = function createDatabasePool() {
    return new Pool(env.database);
};

