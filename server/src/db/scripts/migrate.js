const { runner } = require("node-pg-migrate");

const config = require("../migration.config");

const conf = {
    ...config,
    direction: "up",
}

console.log("conf: ", conf)

runner(conf);
