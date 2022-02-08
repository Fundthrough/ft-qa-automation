import SigninElements from '../../support/Page_Objects/SigninElements.js';

describe('upload invoice from dashboard', () => {

    beforeEach(() => {
        cy.visit('https://nebula-client.fundthrough.com/signin')
        cy.clearLocalStorage()
        cy.fixture('profile').then(function (user) {
            this.user = user;
        });

    });

    it('Setup Account', function (test) {
        cy.login(this.user.username, this.user.password)
        cy.intercept({ method: 'GET', url: '/credit/client_data' }, { status: 200 }).as('total')
        cy.wait('@total')
        const signinElements = new SigninElements();

        function setupAccount() {
            signinElements.velocitydashboard.getnavbar().click();
            signinElements.menuitems.getaccountsetupnotification().should('be.visible');
            signinElements.menuitems.getaccountsetupnotification().should('have.class', 'red');
            signinElements.menuitems.getaccountsetuplink().click();
        }
    });

});