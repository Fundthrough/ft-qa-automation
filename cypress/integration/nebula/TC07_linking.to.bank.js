import SigninElements from '../../support/Page_Objects/SigninElements.js';
import 'cypress-file-upload';
import 'cypress-wait-until';

describe('Review the funding agreement',() => {
    before(() => {
        cy.visit('https://nebula-client.fundthrough.com/signin')
        //cy.clearLocalStorage()
        cy.get('#username').type('asset2@fundthrough.com')
        cy.get('#password').type('1Password')
        cy.get('.ui.circular.button.forward').click()
        cy.url().should('include', '/invoices')
        //cy.fixture('businessuser').then(function (user) { this.user = user; })

    })

    it('Validate the funding agreement review process',() => {
        //cy.login(this.user.username, this.user.password)
        const signinElements = new SigninElements();

        function linktobank() {
            signinElements.customerPage.getforwardbutton().click({force:true})
            // signinElements.customerPage.getIframe().then($el => {
            //     cy.wrap($el.find('button.Button-module_text__38wV0')).click()
            // })
            const getIframe = () => {return cy.get('#plaid-link-iframe-1').its('0.contentDocument').should('exist')}
            const getIframeBody = () => {return getIframe().its('body').should('not.be.undefined').then(cy.wrap)}
            getIframeBody().find('.Button-module_flex__2To5J')
                            .should('have.text','Continue')
                            .click()
            
            // .then($el => {
            //     $el.find('.App__content').then($btn => {
            //         cy.wrap($btn.find('button.Button-module_text__38wV0')).click()
            //         signinElements.customerPage.selectbank().click()
            //         signinElements.customerPage.getusername().type('user_good')
            //         signinElements.customerPage.getpassword().type('pass_good')
            //         cy.on('window:confirm', () => false)
            //     })
            // })
            // signinElements.customerPage.getforwardbutton().eq(0).click()
            // signinElements.customerPage.getcheckbox().check()
            // signinElements.customerPage.getforwardbutton().click()
            // cy.url().should('include', '/invoices')
        }

        signinElements.velocitydashboard.getallctioncard().then((body) => {
            if (body.find('.ft-action-card-strip').length > 3) {
                cy.get('.slick-slide').eq(3).click()
                linktobank()
            }
            else {
                cy.log('The Funding Agreement Review step is completed')
            }
        })
    })

})