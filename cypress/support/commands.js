
Cypress.Commands.add('login' , (username, password) => {
    cy.clearLocalStorage()
    cy.visit("/signin")
    cy.get('#username').type(username)
    cy.get('#password').type(password)
    cy.get('.forward').click()
})
