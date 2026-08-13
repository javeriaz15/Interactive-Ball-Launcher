const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000",
    pageLoadTimeout: 120000,
    defaultCommandTimeout: 10000,
    slowTestThreshold: 5000,
  },
  video: false,
  allowCypressEnv: false,
});