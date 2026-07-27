const { runner } = require("node-pg-migrate");

const config = require("../migration.config");

const conf = {
    ...config,
    direction: "down",
}

console.log("conf: ", conf)

runner(conf);