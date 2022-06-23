import { checkCard } from "./Page_Objects/invoiceElements"

Cypress.Commands.add('login' , (username, password) => {
    cy.clearLocalStorage()
    cy.visit("/signin")
    cy.get('.skip-container > .ui').click({ force: true })
    cy.get('#username').type(username)
    cy.get('#password').type(password)
    cy.get('.forward').click()
    cy.intercept('POST', '/v1/t', {}).as('userSignin')
    cy.wait('@userSignin', { timeout: 40000 })
    cy.get('.loader').should('exist')
    cy.get('.loader').should('not.exist')
})

Cypress.Commands.add('checkCard', checkCard)
