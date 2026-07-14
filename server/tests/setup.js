// require("dotenv").config();
// const createApplication = require("../src/bootstrap/createApplication");

// let application;
// beforeAll(async () => {
//     application = createApplication();
// });
// afterAll(async () => {
//     await application.stop();
// });
// global.application = application;


require("dotenv").config();
const createApplication = require("../src/bootstrap/createApplication");
const application = createApplication();
module.exports = application;