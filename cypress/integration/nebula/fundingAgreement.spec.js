import {SignUpPage} from "../../support/Page_Objects/signUpPage";
import {checkButtonIsActive, checkButtonIsDisabled, clickButtonByValue} from "../../support/Helpers/common/button";
import {randomChars} from "../../support/Helpers/common";
import SignInElements from "../../support/Page_Objects/SigninElements";
import {
    FundingAgreementPage,
    fundingAgreementSelectors,
    fundingAgreementTexts
} from "../../support/Page_Objects/dashboard/fundingAgreement";
import {checkErrorMessage, messageTexts} from "../../support/Helpers/common/messages";

describe('Legal Details', () => {
    beforeEach(() => {
        cy.clearLocalStorage()
        cy.fixture('profile').then(function (user) {
            this.user = user;
        })
    })

    it('Invalid Legal Details form submission', function () {
        const fundingAgreementPage = new FundingAgreementPage();

        cy.login(this.user.username, this.user.password)

        fundingAgreementPage
            .selectCard(fundingAgreementTexts.fundingAgreement, 'Review')
            .checkProgress( 'Legal Stuff',1, 4)

        clickButtonByValue('Get Started')

        fundingAgreementPage
            .checkProgress( fundingAgreementTexts.legalInformation,2, 4)

        clickButtonByValue('Looks Correct')
        checkErrorMessage(messageTexts.jobTitleError)

        fundingAgreementPage
            .updateField(fundingAgreementSelectors.businessName, fundingAgreementSelectors.updateBusinessName, '1')

        checkErrorMessage(messageTexts.businessNameError)

        fundingAgreementPage
            .typeInField(fundingAgreementSelectors.businessName, 'Test Business')
            // .updateField(fundingAgreementSelectors.businessName, fundingAgreementSelectors.updateBusinessName, 'Test Business')
            // .updateField(fundingAgreementSelectors.jobTitle, fundingAgreementSelectors.updateJobTitle, '1')

        // checkErrorMessage(messageTexts.jobTitleError)
    })

    // it('Submit Legal Details', function () {
    //     const signUpPage = new SignUpPage();
    //     const signInElements = new SignInElements();
    //     const fundingAgreementPage = new FundingAgreementPage()
    //
    //     cy.login(this.user.username, this.user.password)
    //
    //     fundingAgreementPage
    //         .selectCard(fundingAgreementTexts.fundingAgreement, 'Review')
    //         .checkProgress( 'Legal Stuff',1, 4)
    //         .verifyCardContentHeader(fundingAgreementTexts.legalInformation)
    //         .verifyCardContentHeader(fundingAgreementTexts.fundingTerms)
    //         .verifyCardContentHeader(fundingAgreementTexts.taxAuth)
    //
    //     clickButtonByValue('Get Started')
    //
    //     fundingAgreementPage
    //         .checkProgress( fundingAgreementTexts.legalInformation,2, 4)
    //
    //     checkButtonIsActive('Back')
    //     clickButtonByValue('Looks Correct')
    //     checkErrorMessage(messageTexts.jobTitleError)
    //
    //     fundingAgreementPage
    //         .updateField(fundingAgreementSelectors.businessName, fundingAgreementSelectors.updateBusinessName, '1')
    //
    //     checkErrorMessage(messageTexts.businessNameError)
    //
    //     fundingAgreementPage
    //         .updateField(fundingAgreementSelectors.businessName, fundingAgreementSelectors.updateBusinessName, '1')
    //
    //
    //
    //
    //
    //
    // })
})

Cypress.on('uncaught:exception', (err, runnable) => {
    return false
})