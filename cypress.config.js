const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: '84on2o',
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: "http://localhost:3000/",
  },
});
