import { signUpSelectors} from "../../support/Page_Objects/signUpPage";
import {checkButtonIsActive, clickButtonByValue} from "../../support/Helpers/common/button";

import {
    FundingAgreementPage,
    fundingAgreementSelectors,
    fundingAgreementTexts
} from "../../support/Page_Objects/dashboard/fundingAgreement";
import {agreementError, checkErrorMessage, messageTexts} from "../../support/Helpers/common/messages";
import {checkTheCheckbox, verifyCheckbox} from "../../support/Helpers/common/checkbox";
import {checkTooltip, tooltipTexts} from "../../support/Helpers/common/tooltip";

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
        checkTooltip('First Business Tax Year',tooltipTexts.taxYear)
        checkTooltip('Your Personal Address',tooltipTexts.personalAddress)
        checkTooltip('Employer Identification Number (EIN)',tooltipTexts.identificationNumber)
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

        const getIframeDocument = () => {
            return cy
                .get('iframe.x-hellosign-embedded__iframe')
                .its('0.contentDocument').should('exist')
        }

        const getIframeBody = () => {
            // get the document
            return getIframeDocument()
                .its('body').should('not.be.undefined')
                .then(cy.wrap)
        }

        getIframeBody().wait(9000)
        getIframeBody().find('.m-signature-request-preview--test-warning--content').within(() => {
            clickButtonByValue('OK')
        })
        getIframeBody().find('[data-qa-ref="signature-input"]').click({force: true})
        getIframeBody().find('#signature-modal-draw__canvas').click(10,20).click(20,30)
       
        getIframeBody().within(() => {
            clickButtonByValue('Insert')
            clickButtonByValue('Continue')
            clickButtonByValue('I agree')
          
        })
     
    })
})

Cypress.on('uncaught:exception', (err, runnable) => {
    return false
})