const { preprocessor } = require("cypress-cucumber-preprocessor");

module.exports = (on) => {
  on("file:preprocessor", preprocessor());
};
