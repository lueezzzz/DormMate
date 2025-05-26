const {defineConfig} = require('cypress');
const cucumber = require('@badeball/cypress-cucumber-preprocessor').default;
const browserify = require('@badeball/cypress-cucumber-preprocessor/browserify');

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://localhost:5173", 
    specPattern: "cypress/e2e/**/*.feature", 

    async setupNodeEvents(on, config) {

      await cucumber.addCucumberPreprocessorPlugin(on, config);

      on(
        "file:preprocessor",
        browserify({
          ...browserify.defaultOptions,
        })
      );
      return config;
    },
  },
});
