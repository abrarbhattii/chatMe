module.exports = {
    testEnvironment: "node",

    testMatch: [
        "<rootDir>/tests/**/*.test.js",
        "<rootDir>/tests/**/*.spec.js"
    ],

    setupFilesAfterEnv: [
        "<rootDir>/tests/setup.js"
    ],
};