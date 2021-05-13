import { Given, Then } from "cypress-cucumber-preprocessor/steps";
 
Given('I open {string} page', (pageUrl) => {
  cy.visit(pageUrl)
})

Then(`I see {string} in the title`, (title) => {
  cy.get("h4").contains(title);
})

Then(`I type {string} in {string}`, (text, field) => {
  cy.get(field).type(text)
})

Then(`I make a screeshot`, () => {
  cy.matchImageSnapshot();
})