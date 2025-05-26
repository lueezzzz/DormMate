import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given("the DormMate app is running", () => {
  cy.visit("/");
});

Given("I am on the login page", () => {
  cy.visit("/login");
});

When("I login with email {string} and password {string}", (email, password) => {
  cy.get("#email").clear().type(email);
  cy.get("#password").clear().type(password);
  cy.get('button[type="submit"]').click();
});

Then("I should be redirected to {string}", (expectedRoute) => {
  cy.location("pathname", { timeout: 10000 }).should("eq", expectedRoute);
});
