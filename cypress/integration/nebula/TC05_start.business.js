import SigninElements from '../../support/Page_Objects/SigninElements.js';
import 'cypress-file-upload';
import 'cypress-wait-until';

describe('Tell us about your business', () => {

    before(() => {
        cy.visit('https://nebula-client.fundthrough.com/signin')
        //cy.clearLocalStorage()
        cy.get('#username').type('asset2@fundthrough.com')
        cy.get('#password').type('1Password')
        cy.get('.ui.circular.button.forward').click()
        cy.url().should('include', '/invoices')
        //cy.fixture('businessuser').then(function (user) { this.user = user; })

    })

    it('Validate the start business process', () => {
        //cy.login(this.user.username, this.user.password)
        const signinElements = new SigninElements();

        function uploadBusinessFiles() {
            signinElements.customerPage.getforwardbutton().click()
            signinElements.customerPage.uploadfiles().attachFile('example.json', { subjectType: 'drag-n-drop' })
            //Validate Error Message
            cy.get('.message').then(($m) => {
                expect($m).to.have.class('ui icon message error')
                expect($m).to.have.text('There was an error uploading the file. Please ensure the file is a .pdf, .jpg, .png, or other image file and try again.')
                expect($m).to.have.css('background-color', 'rgb(255, 232, 230)')
            }).then(($el) => {
                signinElements.customerPage.uploadfiles().attachFile('testPicture.png', { subjectType: 'drag-n-drop' })
                //Validate Success Message
                cy.waitUntil(() => signinElements.customerPage.getsuccessmessage().invoke('text').then((text) => {
                    expect(text).to.equals('Got it!')
                }))
                signinElements.customerPage.getforwardbutton().click().then(($el) => {
                    signinElements.customerPage.uploadfiles().attachFile('example.json', { subjectType: 'drag-n-drop' })
                    //Validate error message
                    cy.get('.message').then(($m) => {
                        expect($m).to.have.class('ui icon message error')
                        expect($m).to.have.text('There was an error uploading the file. Please ensure the file is a .pdf, .jpg, .png, or other image file and try again.')
                        expect($m).to.have.css('background-color', 'rgb(255, 232, 230)')
                    }).then(($el) => {
                        signinElements.customerPage.uploadfiles().attachFile('testPicture.png', { subjectType: 'drag-n-drop' })
                        //Validate Success Message
                        signinElements.customerPage.getsuccessmessage().invoke('text').then((text) => {
                            expect(text).to.equals('Got it!')
                        })
                        signinElements.customerPage.getforwardbutton().click().then(($el) => {
                            signinElements.customerPage.uploadfiles().attachFile('example.json', { subjectType: 'drag-n-drop' })
                            //Validate error message
                            cy.get('.message').then(($m) => {
                                expect($m).to.have.class('ui icon message error')
                                expect($m).to.have.text('There was an error uploading the file. Please ensure the file is a .pdf, .jpg, .png, or other image file and try again.')
                                expect($m).to.have.css('background-color', 'rgb(255, 232, 230)')
                            }).then(($el) => {
                                signinElements.customerPage.uploadfiles().attachFile('testPicture.png', { subjectType: 'drag-n-drop' })
                                //Validate Success Message
                                signinElements.customerPage.getsuccessmessage().invoke('text').then((text) => {
                                    expect(text).to.equals('Got it!')
                                })
                                signinElements.customerPage.getforwardbutton().click()
                                cy.url().should('include', '/legal')

                            })
                        })
                    })
                })
            })
        }
        signinElements.velocitydashboard.getallctioncard().then((body) => {
            if (body.find('.ft-action-card-strip').length > 3) {
                console.log(cy.get('.slick-list'))
                cy.get('.slick-slide').eq(1).click()
                uploadBusinessFiles()
            }
            else {
                cy.log('The `About your Business` step is completed')
            }
        })
    })
})
