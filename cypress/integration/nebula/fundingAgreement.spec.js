import {SignUpPage, signUpSelectors, signUpTexts} from "../../support/Page_Objects/registration/signUpPage";
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