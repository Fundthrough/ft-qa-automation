Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
  });

describe('Sign Up Page', () => {
    it('Visits sign up page', () => {
      cy.visit('/')
  
      cy.get("h4").contains('Sign Up');
  
      cy.get("#username")
        .should('exist')
        .type("admin@fundthrough.com")
        ;
  
      cy.matchImageSnapshot("SignUp Page - default size");
  
      cy.viewport('iphone-10')
  
      cy.matchImageSnapshot("Login Page - iphone10");
    })
  })
  