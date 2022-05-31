import {SignUpPage, signUpSelectors, signUpTexts} from "../../support/Page_Objects/signUpPage";
import {
    checkButtonIsActive, checkButtonIsDisabled,
    checkTheCheckbox,
    clickButtonByValue,
    verifyCheckbox
} from "../../support/Helpers/common/button";

import {
    FundingAgreementPage,
    fundingAgreementSelectors,
    fundingAgreementTexts
} from "../../support/Page_Objects/dashboard/fundingAgreement";
import {agreementError, checkErrorMessage, messageTexts} from "../../support/Helpers/common/messages";
import {checkTooltip, tooltipSelectors, tooltipTexts} from "../../support/Helpers/common/tooltip";
import {getIframeBody, iframeSelectors} from "../../support/Helpers/common/iframe";
import {randomChars} from "../../support/Helpers/common";
import {verifyNavigation, visit} from "../../support/Helpers/common/navigation";
import {checkEmptyInput, checkInputValue, fillInputWithValue, inputSelectors} from "../../support/Helpers/common/input";
import {checkProgressAndHeader} from "../../support/Helpers/common/title";

describe('Legal Details', () => {
    beforeEach(() => {
        cy.clearLocalStorage()
        cy.fixture('profile').then(function (user) {
            this.user = user;
        })
    })

    // it('Sign Up with correct credentials', function () {
    //     const signUpPage = new SignUpPage();
    //
    //     const email = "techadmin" + randomChars(4) + "@fundthrough.com";
    //
    //     visit('/signup')
    //     verifyNavigation('signup')
    //     checkEmptyInput(inputSelectors.email)
    //     checkButtonIsDisabled('Next')
    //     fillInputWithValue(inputSelectors.email, email)
    //     clickButtonByValue('Next')
    //     checkInputValue(inputSelectors.email, email)
    //
    //     signUpPage
    //         .saveUserEmail_LS()
    //
    //     fillInputWithValue(inputSelectors.password, '1Password')
    //
    //     signUpPage
    //         .revealPassword(true, '1Password')
    //
    //     verifyCheckbox(signUpSelectors.checkboxWrapper, signUpTexts.oneNumber, true)
    //     verifyCheckbox(signUpSelectors.checkboxWrapper, signUpTexts.oneLetter, true)
    //     verifyCheckbox(signUpSelectors.checkboxWrapper, signUpTexts.charLength, true)
    //
    //     signUpPage
    //         .checkTermsAndCond()
    //         .uncheckTermsAndCond()
    //
    //     checkErrorMessage(messageTexts.termsAndConditions)
    //
    //     signUpPage
    //         .checkTermsAndCond()
    //
    //     clickButtonByValue('Next')
    //
    //     signUpPage
    //         .checkOnboardingDirectionUrl()
    //
    //     checkProgressAndHeader('Connect to your invoicing software', 1, 6)
    //     //Step 1 page validation
    //     signUpPage
    //         .checkQuickBooksHeader()
    //         .checkImage()
    //         .skipQuickBooksStep()
    //
    //     cy.intercept({method: 'POST', url: 'https://api.segment.io/v1/p'}, {success: true}).as('nextStep')
    //     cy.wait('@nextStep', {timeout: 60000})
    //     // //Step 2 page validation
    //     checkProgressAndHeader("What is your business’s legal name?", 2, 6)
    //     fillInputWithValue(inputSelectors.businessName, randomChars(4))
    //     verifyCheckbox(signUpSelectors.checkbox, signUpTexts.customerCallCheckbox, true)
    //     checkTooltip(tooltipSelectors.inputLabel, 'Business Legal Name', tooltipTexts.businessLegalName)
    //     clickButtonByValue('Next')
    //
    //     //redirects to Step 3 and fills in Company Address info
    //     cy.wait('@nextStep', {timeout: 60000})
    //
    //     // Should be uncommented after fixing the issue with step
    //     // checkProgressAndHeader('Where is your business located?', 3, 6)
    //
    //     fillInputWithValue(inputSelectors.mainAddress, '100 test street')
    //     checkEmptyInput(inputSelectors.secondAddress)
    //     fillInputWithValue(inputSelectors.city, 'Cary')
    //     fillInputWithValue(inputSelectors.postalCode, '12345')
    //
    //     signUpPage
    //         .selectCountry("USA")
    //         .selectProvince('West Virginia')
    //
    //     checkTooltip(tooltipSelectors.inputLabel, 'Business Address', tooltipTexts.businessAddress)
    //
    //     clickButtonByValue('Next')
    //
    //     cy.wait('@nextStep', {timeout: 60000})
    //
    //     checkProgressAndHeader('How can we reach you?', 4, 6)
    //     fillInputWithValue(inputSelectors.phoneNumber, '6470001234')
    //     checkTooltip(tooltipSelectors.inputLabel, 'Contact Phone', tooltipTexts.contactPhone)
    //     clickButtonByValue('Next')
    //
    //     cy.wait('@nextStep', {timeout: 60000})
    //
    //     checkProgressAndHeader("What's your name?", 5, 6)
    //     fillInputWithValue(inputSelectors.preferredName, randomChars(4))
    //     fillInputWithValue(inputSelectors.firstName, randomChars(4))
    //     fillInputWithValue(inputSelectors.lastName, randomChars(4))
    //     checkTooltip(tooltipSelectors.inputLabel, 'Legal First Name', tooltipTexts.firstName)
    //     checkTooltip(tooltipSelectors.inputLabel, 'Preferred First Name', tooltipTexts.firstName)
    //     clickButtonByValue('Next')
    //
    //     signUpPage
    //         .checkHeardAboutUsInput()
    //
    //     checkProgressAndHeader("How did you hear about us? (Optional)", 6, 6)
    //
    //     clickButtonByValue('Skip')
    //     cy.wait('@nextStep', {timeout: 60000})
    //     signUpPage
    //         .logOut()
    //
    //     verifyNavigation('signin')
    // })


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
            .updateField(fundingAgreementSelectors.taxYear, fundingAgreementSelectors.updateTaxYear, '1')

        checkErrorMessage(messageTexts.taxYearError)

        fundingAgreementPage
            .updateField(fundingAgreementSelectors.phoneNumber, fundingAgreementSelectors.updatePhoneNumber, '1')

        checkErrorMessage(messageTexts.phoneNumberError)

        fundingAgreementPage
            .updateField(fundingAgreementSelectors.businessNumber, fundingAgreementSelectors.addingBusinessNumber,'1')

        checkErrorMessage(messageTexts.identificationNumber)

        fundingAgreementPage
            .updateField(signUpSelectors.firstName, fundingAgreementSelectors.updateLegalName,'1')
            .typeInField(signUpSelectors.lastName, '1')

        checkErrorMessage(messageTexts.invalidName)
        checkErrorMessage(messageTexts.invalidSurname)
    })

    it('Valid Legal Details form submission', function () {
        const fundingAgreementPage = new FundingAgreementPage();

        cy.login(this.user.username, this.user.password)

        fundingAgreementPage
            .selectCard(fundingAgreementTexts.fundingAgreement, 'Review')
            .checkProgress( 'Legal Stuff',1, 4)

        clickButtonByValue('Get Started')
        checkButtonIsActive('Back')
        checkButtonIsActive('Looks Correct')

        fundingAgreementPage
            .checkProgress( fundingAgreementTexts.legalInformation,2, 4)
            .updateField(fundingAgreementSelectors.businessName, fundingAgreementSelectors.updateBusinessName, 'Test Business')
            .updateField(fundingAgreementSelectors.jobTitle, fundingAgreementSelectors.addJobTitle, 'Test Job Title')
            .updateField(fundingAgreementSelectors.taxYear, fundingAgreementSelectors.updateTaxYear, '2000')
            .updateField(fundingAgreementSelectors.phoneNumber, fundingAgreementSelectors.updatePhoneNumber, '647-000-1234')
            .updateField(fundingAgreementSelectors.businessNumber, fundingAgreementSelectors.addingBusinessNumber, '123456789')


        verifyCheckbox('.checkbox','Same as business address', false)
        checkTheCheckbox('.checkbox', 'Same as business address')
        checkTooltip(tooltipSelectors.header, 'First Business Tax Year',tooltipTexts.taxYear)
        checkTooltip(tooltipSelectors.header, 'Your Personal Address',tooltipTexts.personalAddress)
        checkTooltip(tooltipSelectors.header, 'Employer Identification Number (EIN)',tooltipTexts.identificationNumber)
        verifyCheckbox('.checkbox','Same as business address', true)
        clickButtonByValue('Looks Correct')

        fundingAgreementPage
            .checkProgress( 'Agree to the funding terms',3, 4)
            .verifyFundingTerms()

        checkButtonIsActive('Not Now')
        checkButtonIsActive('I Agree')
        clickButtonByValue('I Agree')
        agreementError(messageTexts.agreementCard)
        verifyCheckbox('.checkbox','accept the Master Purchase and Sale Agreement and have the authority to bind the Corporation.', false)
        verifyCheckbox('.checkbox','accept the Personal Guarantee.', false)
        checkTheCheckbox('.checkbox', 'accept the Master Purchase and Sale Agreement and have the authority to bind the Corporation.')
        checkTheCheckbox('.checkbox', 'accept the Personal Guarantee.')
        clickButtonByValue('I Agree')

        getIframeBody(iframeSelectors.contractIframe).wait(9000)
        getIframeBody(iframeSelectors.contractIframe).find('.m-signature-request-preview--test-warning--content').within(() => {
            clickButtonByValue('OK')
        })
        getIframeBody(iframeSelectors.contractIframe).find('[data-qa-ref="signature-input"]').click({force: true})
        getIframeBody(iframeSelectors.contractIframe).find('#signature-modal-draw__canvas').click({force: true})
        getIframeBody(iframeSelectors.contractIframe).within(() => {
            cy.wait(1000)
            clickButtonByValue('Insert')
            clickButtonByValue('Continue')
            clickButtonByValue('I agree')
        })
    })
})

Cypress.on('uncaught:exception', (err, runnable) => {
    return false
})