import {SignUpPage} from "../../support/Page_Objects/signUpPage";
import {
    checkButtonIsActive,
    checkTheCheckbox,
    clickButton,
    clickButtonByValue,
    verifyCheckbox
} from "../../support/Helpers/common/button";

import {
    FundingAgreementPage,
    fundingAgreementSelectors,
    fundingAgreementTexts
} from "../../support/Page_Objects/dashboard/fundingAgreement";
import {
    checkMessage,
    messageSelectors,
    messageTexts
} from "../../support/Helpers/common/messages";
import {checkTooltip, tooltipSelectors, tooltipTexts} from "../../support/Helpers/common/tooltip";
import {inputSelectors} from "../../support/Helpers/common/input";
import {getIframeBody, iframeSelectors} from "../../support/Helpers/common/iframe";
import {verifyNavigation} from "../../support/Helpers/common/navigation";

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
        checkMessage(messageSelectors.error, messageTexts.jobTitleError)

        fundingAgreementPage
            .updateField(fundingAgreementSelectors.businessName, fundingAgreementSelectors.updateBusinessName, '1')

        checkMessage(messageSelectors.error, messageTexts.businessNameError)

        fundingAgreementPage
            .updateField(fundingAgreementSelectors.taxYear, fundingAgreementSelectors.updateTaxYear, '1')

        checkMessage(messageSelectors.error, messageTexts.taxYearError)

        fundingAgreementPage
            .updateField(fundingAgreementSelectors.phoneNumber, fundingAgreementSelectors.updatePhoneNumber, '1')

        checkMessage(messageSelectors.error, messageTexts.phoneNumberError)

        fundingAgreementPage
            .updateField(fundingAgreementSelectors.businessNumber, fundingAgreementSelectors.addingBusinessNumber,'1')

        checkMessage(messageSelectors.error, messageTexts.identificationNumber)

        fundingAgreementPage
            .updateField(inputSelectors.firstName, fundingAgreementSelectors.updateLegalName,'1')
            .typeInField(inputSelectors.lastName, '1')

        checkMessage(messageSelectors.error, messageTexts.invalidName)
        checkMessage(messageSelectors.error, messageTexts.invalidSurname)
    })

    it('Valid Legal Details form submission', function () {
        const fundingAgreementPage = new FundingAgreementPage();
        const signUpPage = new SignUpPage();

        cy.login(this.user.username, this.user.password)

        fundingAgreementPage
            .selectCard(fundingAgreementTexts.fundingAgreement, 'Review')
            .checkProgress( 'Legal Stuff',1, 4)

        clickButtonByValue('Get Started')
        checkButtonIsActive('Back')
        checkButtonIsActive('Looks Correct')

        fundingAgreementPage
            .checkProgress( fundingAgreementTexts.legalInformation,2, 4)


        clickButtonByValue("Back");
        verifyNavigation("/legal");

        fundingAgreementPage
            .checkProgress( 'Legal Stuff',1, 4)

        clickButtonByValue('Get Started')

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
        checkMessage(messageSelectors.agreementError, messageTexts.agreementCard)
        verifyCheckbox('.checkbox','accept the Master Purchase and Sale Agreement and have the authority to bind the Corporation.', false)
        verifyCheckbox('.checkbox','accept the Personal Guarantee.', false)
        checkTheCheckbox('.checkbox', 'accept the Master Purchase and Sale Agreement and have the authority to bind the Corporation.')
        checkTheCheckbox('.checkbox', 'accept the Personal Guarantee.')
        clickButtonByValue('I Agree')
        getIframeBody(iframeSelectors.signingDocIframe).wait(9000)
        getIframeBody(iframeSelectors.signingDocIframe).find(iframeSelectors.signatureContentIframe).within(() => {
            clickButtonByValue('OK')
        })
        getIframeBody(iframeSelectors.signingDocIframe).find(iframeSelectors.signatureInput).click({force: true})
        getIframeBody(iframeSelectors.signingDocIframe).find(iframeSelectors.signatureCanvasIframe).click(10,20).click(20,30)
       
        getIframeBody(iframeSelectors.signingDocIframe).within(() => {
            clickButton('Insert')
            clickButtonByValue('Continue')
            clickButtonByValue('I agree')
            clickButtonByValue('Close')
          
        })

        signUpPage
            .selectItemFromNavbar('Invoices')

        checkMessage(messageSelectors.notificationDashboard,'Step completed')
        checkMessage(messageSelectors.notificationDashboard,'Thank you for reviewing the funding agreement.')

        cy.checkCard().then(element => {
            if (element.text().includes('Review the funding agreement')) {
                cy.log("Review the funding agreement with action card")
                fundingAgreementPage
                    .selectCard(fundingAgreementTexts.fundingAgreement, 'Review');
            } else {
                fundingAgreementPage.checkCard('Review the funding agreement', false)
            }
        })
    })
})

Cypress.on('uncaught:exception', () => {
    return false
})