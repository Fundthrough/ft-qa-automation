import SigninElements from '../../support/Page_Objects/SigninElements.js';
import 'cypress-file-upload';

describe('upload invoice from dashboard', () => {

        cy.clearLocalStorage()
        cy.fixture('profile').then(function (user) {
                this.user = user;
        })
})

it('SignIn with Valid Credential', function test() {

        cy.login(this.user.username, this.user.password)
        cy.intercept({ method: 'GET', url: '/client/credit/client_data' }, { status: 200 }).as('total')
        cy.wait('@total')
        const signinElements = new SigninElements();


        function uploadinvoice() {
                signinElements.customerPage.getcardcotent().then(($element) => {
                        signinElements.customerPage.getupoadinvoice()
                                .attachFile('example.json', { subjectType: 'drag-n-drop' })
                        //validate error message
                        cy.get('.message').then(($m) => {
                                expect($m).to.have.class('ui icon message error')
                                expect($m).to.have.text('There was an error uploading the file. Please ensure the file is a .pdf, .jpg, .png, or other image file and try again.')
                                expect($m).to.have.css('background-color', 'rgb(255, 232, 230)')
                        }).then(($element) => {
                                cy.get('button.ui.primary.button.upload.circular')
                                        .attachFile('testPicture.png', { subjectType: 'drag-n-drop' })
                                //file has been added
                                cy.contains('testPicture.png')//this need to be fix
                                signinElements.customerPage.getsuccessmessage()
                        }).then(($element) => {
                                signinElements.entercustomern('customer1')
                                signinElements.customerPage.clickdropdown()
                                //input invoice number
                                signinElements.customerPage.getinvoicenumber().type('m1')
                                signinElements.getdatetoinvoicepage()
                                signinElements.netDaysCount();
                                //input invoice amount
                                signinElements.enterrandomnumber()
                        }).then(() => {
                                signinElements.customerPage.getbuttonuploadinvoice().click({ force: true })
                                cy.wait(2000)
                        })
                })
                signinElements.customerPage.getinvoicecreated()
                //cy.wait('@addinvoice')
                //signout
                signinElements.velocitydashboard.getnavbar().click()
                signinElements.velocitydashboard.gettitle().then(($angle) => {
                        const ls = $angle.attr('class')
                        cy.wrap($angle).click().should('have.class', 'active')
                        signinElements.velocitydashboard.contentbutton().click();
                })
        }
})