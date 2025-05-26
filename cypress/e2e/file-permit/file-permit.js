import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";


Given("I am on the file permit page", () => {
  cy.visit("/file-permit");
});

When("I open the File Permit modal", () => {
  cy.contains("button", "File Permit").click();
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

Then("the File Permit modal should close", () => {
  cy.get('div[role="dialog"]').should("not.exist");
});
