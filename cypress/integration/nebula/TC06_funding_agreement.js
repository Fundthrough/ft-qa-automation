import SigninElements from '../../support/Page_Objects/SigninElements.js';
import 'cypress-file-upload';
import 'cypress-wait-until';

describe('Review the funding agreement',() => {
    before(() => {
        cy.visit('https://nebula-client.fundthrough.com/signin')
        //cy.clearLocalStorage()
        cy.get('#username').type('asset@gmail.com')
        cy.get('#password').type('1Password')
        cy.get('.ui.circular.button.forward').click()
        cy.url().should('include', '/invoices')
        //cy.fixture('businessuser').then(function (user) { this.user = user; })

    })

    it('Validate the funding agreement review process',() => {
        //cy.login(this.user.username, this.user.password)
        const signinElements = new SigninElements();

        function reviewAgreement() {
            signinElements.customerPage.getforwardbutton().click()
            signinElements.customerPage.getbusinessname().eq(0).type('{selectall}{backspace}')
            signinElements.customerPage.anyelement().eq(0).click()
            //Validate error message
            signinElements.customerPage.geterror().invoke('text').then(text => {
                expect(text).to.eql('Invalid business name')
            })
            //Validate successful update
            signinElements.customerPage.getbusinessname().eq(0).type('Insurance')
            signinElements.customerPage.updatebutton().click()
            // cy.get('.full-width.mobilize').then(($el) => {
            //     if($el.find('p[id="updatingJobTitle"]').length > 0 ) {
            //         cy.get('p[id="updatingJobTitle"]').click()
            //         signinElements.customerPage.getbusinessname().eq(0).type('Insurance')
            //         signinElements.customerPage.updatebutton().click()

            //     } else if($el.find('button[id="addingJobTitle"]').length > 0){
            //         cy.get('button[id="addingJobTitle"]').click()
            //         signinElements.customerPage.getbusinessname().type('Insurance')
            //         signinElements.customerPage.updatebutton().click()
            //     }
            // })
        }

        signinElements.velocitydashboard.getallctioncard().then((body) => {
            if (body.find('.ft-action-card-strip').length > 3) {
                cy.get('.slick-slide').eq(2).click()
                reviewAgreement()
            }
            else {
                cy.log('The Funding Agreement Review step is completed')
            }
        })
    })

})