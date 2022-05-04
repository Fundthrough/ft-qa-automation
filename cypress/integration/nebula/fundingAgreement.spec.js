import {SignUpPage} from "../../support/Page_Objects/signUpPage";
import {checkButtonIsActive, checkButtonIsDisabled, clickButtonByValue} from "../../support/Helpers/common/button";
import {randomChars} from "../../support/Helpers/common";
import SignInElements from "../../support/Page_Objects/SigninElements";
import {FundingAgreementPage} from "../../support/Page_Objects/dashboard/fundingAgreement";

describe('Legal Details', () => {
    beforeEach(() => {
        cy.clearLocalStorage()
        cy.fixture('profile').then(function (user) {
            this.user = user;
        })
    })

    it('Submit Legal Details', function () {
        const signUpPage = new SignUpPage();
        const signInElements = new SignInElements();
        const fundingAgreementPage = new FundingAgreementPage()

        cy.visit('https://nebula-client.fundthrough.com/signin');
        cy.login(this.user.username, this.user.password)
        signInElements.usercredential.getskipcontainer().click({ force: true })
        cy.intercept('POST', '/v1/t', {}).as('userSignin')
        cy.wait('@userSignin', { timeout: 20000 })

        fundingAgreementPage
            .selectCard('Review the funding agreement', 'Review')


    })
})

Cypress.on('uncaught:exception', (err, runnable) => {
    return false
})