import profile from '../fixtures/profile.json';

Cypress.Commands.add('login' , () => {
    cy.clearLocalStorage()
    cy.visit("/signin")
    cy.get('#username').type(profile.username)
    cy.get('#password').type(profile.password)
    cy.get('.forward').click()
})
