import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";


Given("the DormMate app is running", () => {
  cy.visit("/");
});

Given(
  "I am logged in as a dormer with email {string} and password {string}",
  (email, password) => {
    cy.visit("/login");
    cy.get("#email").clear().type(email);
    cy.get("#password").clear().type(password);
    cy.get('button[type="submit"]').click();
    cy.location("pathname", { timeout: 10_000 }).should("eq", "/file-permit");
  }
);

When("I click the logout button", () => {
  cy.contains("button", "Log Out").click();
});

Then("I should see a logout confirmation modal", () => {
  cy.contains("Are you sure you want to log out?").should("be.visible");
});


When("I confirm the logout", () => {
  cy.contains("button", "Confirm").click();
});


Then("I should be redirected to {string}", (path) => {
  cy.location("pathname", { timeout: 10_000 }).should("eq", path);
});
