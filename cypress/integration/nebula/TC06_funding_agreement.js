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
            //Business Name
            signinElements.customerPage.getinputfield().eq(0).click()
            signinElements.customerPage.getbusinessname().clear()
            signinElements.customerPage.anyelement().eq(0).click()
            //Validate error message
            signinElements.customerPage.geterror().invoke('text').then(text => {
                expect(text).to.eql('Invalid business name')
            })
            //Validate successful update
            signinElements.customerPage.getbusinessname().type('Insurance')
            //signinElements.customerPage.updatebutton().click()

            //Job Title
            signinElements.customerPage.getinputfield().eq(0).click()
            signinElements.customerPage.getjobtitle().clear()
            signinElements.customerPage.anyelement().eq(0).click()
            //Validate error message
            signinElements.customerPage.geterror().invoke('text').then(text => {
                expect(text).to.eql('Invalid job title')
            })
            //Validate successful update
            signinElements.customerPage.getjobtitle().type('Director')
            // signinElements.customerPage.updatebutton().click()

            //First Business tax year
            // signinElements.customerPage.gettaxyear().type('{selectall}{backspace}')
            // signinElements.customerPage.anyelement().eq(0).click()
            // //Validate error message
            // signinElements.customerPage.geterror().invoke('text').then(text => {
            //     expect(text).to.eql('Please enter a year between 1945 and 2022')
            // })
            // //Validate successful update
            // // signinElements.customerPage.gettaxyear().type('2000')
            // // signinElements.customerPage.updatebutton().click()

            // //Business Phone Number
            // signinElements.customerPage.getbusinessnumber().type('{selectall}{backspace}')
            // signinElements.customerPage.anyelement().eq(0).click()
            // //Validate error message
            // signinElements.customerPage.geterror().invoke('text').then(text => {
            //     expect(text).to.eql('Please enter a valid phone number')
            // })
            // //Validate successful update
            // // signinElements.customerPage.getbusinessnumber().type('649-1234-567')
            // // signinElements.customerPage.updatebutton().click()

            //Business Address
            // signinElements.customerPage.getbusinessaddress().type('{selectall}{backspace}')
            // signinElements.customerPage.anyelement().eq(0).click()
            // //Validate error message
            // signinElements.customerPage.geterror().invoke('text').then(text => {
            //     expect(text).to.eql('Invalid address')
            // })
            // //Validate successful update
            // signinElements.customerPage.getbusinessname().type('Insurance')
            // signinElements.customerPage.updatebutton().click()

            // //Business Number
            // signinElements.customerPage.getjobtitle().type('{selectall}{backspace}')
            // signinElements.customerPage.anyelement().eq(0).click()
            // //Validate error message
            // signinElements.customerPage.geterror().invoke('text').then(text => {
            //     expect(text).to.eql('Invalid business name')
            // })
            // //Validate successful update
            // signinElements.customerPage.getbusinessname().type('Insurance')
            // signinElements.customerPage.updatebutton().click()

            //Legal Name
            signinElements.customerPage.getinputfield().eq(1).click()
            signinElements.customerPage.getfirstname().clear()
            signinElements.customerPage.anyelement().eq(0).click()
            signinElements.customerPage.geterror().invoke('text').then(text => {
                expect(text).to.equals('Invalid First Name')
            })
            signinElements.customerPage.getlastname().clear()
            signinElements.customerPage.anyelement().eq(0).click()
            signinElements.customerPage.geterror().eq(1).invoke('text').then((text) => {
                    expect(text).to.equals('Invalid Last Name')
            })
            
            // signinElements.customerPage.anyelement().eq(0).click()
            //Validate error message
            
            // signinElements.customerPage.geterror().invoke('text').each((text,index) => {
            //     expect(text[index]).to.eql('Invalid First Name')
            //     expect(text[index]).to.eql('Invalid Last Name')
            // })
            // //Validate successful update
            // signinElements.customerPage.getbusinessname().type('Insurance')
            // signinElements.customerPage.updatebutton().click()

            // //Checkbox Business Address
            // signinElements.customerPage.getjobtitle().type('{selectall}{backspace}')
            // signinElements.customerPage.anyelement().eq(0).click()
            // //Validate error message
            // signinElements.customerPage.geterror().invoke('text').then(text => {
            //     expect(text).to.eql('Invalid business name')
            // })
            // //Validate successful update
            // signinElements.customerPage.getbusinessname().type('Insurance')
            // signinElements.customerPage.updatebutton().click()

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