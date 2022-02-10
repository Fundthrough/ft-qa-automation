import SigninElements from '../../support/Page_Objects/SigninElements.js';

describe('Signin Validation', () => {

    beforeEach(() => {
        cy.visit('https://nebula-client.fundthrough.com/signin');
        cy.clearLocalStorage();
        cy.fixture('profile').then(function (user) {
            this.user = user;
        });

    });
    const signinElements = new SigninElements();
    it('Setup Account', function () {
        
        cy.login(this.user.username, this.user.password);
        signinElements.usercredential.getskipcontainer().click({ force: true });
        cy.intercept('POST', '/v1/t', {}).as('userSignin');
        cy.wait('@userSignin', { timeout: 20000 })
            .then(($div) => {
                signinElements.velocitydashboard.getnavbar().click();
                signinElements.menuitems.getaccountsetupnotification().should('be.visible');
                signinElements.menuitems.getaccountsetupnotification().should('have.class', 'red');
                signinElements.menuitems.getaccountsetuplink().click();
            });
    });

    Cypress.on('uncaught:exception', (err, runnable) => {
        return false;
    });

});