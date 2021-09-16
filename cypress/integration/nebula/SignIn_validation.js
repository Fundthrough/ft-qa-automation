import SigninElements from '../../support/Page_Objects/SigninElements.js';
import { getAccount } from "../../support/Page_Objects/signUpPage.js";


describe('Signin Validation', () => {
    beforeEach(function () {
        cy.visit('https://nebula-client.fundthrough.com/signin')
        cy.clearLocalStorage()
        cy.fixture('profile').then(function (user) {
            this.user = user;
        })
    })

    const emails = (val) => {
        var email = "";
        var possible = "abcd@.fundthrough.com";
        for (var i = 0; i < val; i++) {
            email += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return email;
    }
    const TestEmail = emails(9)
    const PasswordInvalid = emails(9)
    const InvalidTextPassword = emails(4)
    const signinElements = new SigninElements();
    const getaccountpage = new getAccount();
    it('SignIn with Valid Credential', function () {
        cy.login(this.user.username, this.user.password)
        signinElements.usercredential.getskipcontainer().click({ force: true })
        cy.intercept('POST', '/v1/t', {}).as('userSignin')
        //cy.intercept('POST', '/v1/p', {}).as('addinvoice')
        cy.wait('@userSignin', { timeout: 20000 })
            .then(($div) => {
                signinElements.velocitydashboard.getyellowactioncard()


                signinElements.velocitydashboard.getallctioncard().should(($i) => {
                    //expect($i).to.have.length(4)
                    //expect($i).to.contain('Add your first invoice')
                    expect($i).to.contain('Tell us about your business')
                    expect($i).to.contain('Review the funding agreement')
                    expect($i).to.contain('Add your bank')
                })
            })
    })


    it("Sign In with invalid Credentials", function () {
        signinElements.usercredential.getusername().type(this.user.username)
        signinElements.usercredential.getpassword().type(PasswordInvalid)
        signinElements.usercredential.getskipcontainer().click({ force: true })
        //give element 10 seconds to appear
        cy.get('[data-test=authenticator-error] > span',
            { timeout: 10000 })
            .should('be.visible');

        //signin with invalid data
        cy.request({
            url: 'https://cognito-idp.us-east-1.amazonaws.com/',
            failOnStatusCode: false,
            method: 'POST',
        }).then((resp) => {
            expect(resp.status).to.eq(400)
        })
    })

    it("Input invalid Data on username and password", function () {
        signinElements.usercredential.getusername().type(TestEmail)
        signinElements.usercredential.getpassword().type(InvalidTextPassword)
        signinElements.usercredential.getskipcontainer().click({ force: true })
        cy.get('input').then(($input) => {
            if ($input.hasClass('bordered__error')) {
                signinElements.usercredential.fieldlevelerror().should('be.visible');
            } else {
                signinElements.usercredential.fieldlevelerror().should('not.be.visible');
            }
        })
    })

    Cypress.on('uncaught:exception', (err, runnable) => {
        return false
    })

it("Input invalid Data on username and password", function()  { 
    
signinElements.usercredential.getusername().type(TestEmail)
signinElements.usercredential.getpassword().type(InvalidTextPassword)
signinElements.usercredential.getskipcontainer().click({force:true})
cy.get('input').then(($input) => {
if ($input.hasClass('bordered__error')) {
signinElements.usercredential.fieldlevelerror().should('be.visible');
} else {
signinElements.usercredential.fieldlevelerror().should('not.be.visible');
}
})
})
    
Cypress.on('uncaught:exception', (err, runnable) => {
return false
})
 
})
