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
    cy.location("pathname", { timeout: 10000 }).should("eq", "/file-permit");
  }
);

Given("I am on the file permit page", () => {
  cy.visit("/file-permit");
});

When("I open the File Permit modal", () => {
  cy.contains("h1", "File Permits").should("be.visible");
  cy.contains("button", "File a Permit").click();
  cy.get('div[role="dialog"]').should("be.visible");
});

When("I select permit type {string}", (type) => {
  cy.get('select[name="permitType"]').select(type);
});

When("I enter time out {string}", (time) => {
  cy.get('input[name="timeOut"]').type(time);
});

When("I enter destination {string}", (destination) => {
  cy.get('input[name="destination"]').type(destination);
});

When("I enter emergency contact {string}", (contact) => {
  cy.get('input[name="emergencyContact"]').type(contact);
});

When("I enter return date {string}", (date) => {
  cy.get('input[name="returnDate"]').type(date);
});

When("I enter purpose {string}", (purpose) => {
  cy.get('textarea[name="purpose"]').type(purpose);
});

When("I submit the permit", () => {
  cy.get('button[type="submit"]').click();
});

