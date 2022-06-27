import {BankingFlowPage} from "../../support/Page_Objects/dashboard/bankingFlow";
import {checkHeaderText, checkProgressAndHeader} from "../../support/Helpers/common/title";
import {
    checkButtonIsActive, checkButtonIsDisabled, checkButtonNotExists,
    checkTheCheckbox,
    clickButtonByValue,
    verifyCheckbox
} from "../../support/Helpers/common/button";
import {getIframeBody, iframeSelectors, loadingSelectors, waitForLoader} from "../../support/Helpers/common/iframe";
import {fillInputWithValue} from "../../support/Helpers/common/input";
import {SignUpPage} from "../../support/Page_Objects/signUpPage";
import {verifyNavigation} from "../../support/Helpers/common/navigation";
import {checkMessage, messageSelectors} from "../../support/Helpers/common/messages";
import {checkCard} from "../../support/Page_Objects/invoiceElements";

describe('Legal Details', () => {
    beforeEach(() => {
        cy.clearLocalStorage()
        cy.fixture('profile').then(function (user) {
            this.user = user;
        })
    })

    it('Valid Banking Flow form submission', function () {
        const bankingFlowPage = new BankingFlowPage();
        const signUpPage = new SignUpPage();
        cy.login(this.user.username, this.user.password)

        bankingFlowPage
            .checkCard('Add your bank', true)
            .selectCard('Add your bank', 'Link')

        checkProgressAndHeader('Let us know how to pay you', 1, 3)
        checkButtonIsActive('Back')
        checkButtonIsActive('Link Bank')
        checkHeaderText('About linking your bank')
        cy.wait(2000)
        checkButtonIsActive('Link Bank')
        clickButtonByValue('Link Bank')
        getIframeBody(iframeSelectors.plaidIframe).within(() => {
            clickButtonByValue('Continue')
            waitForLoader(loadingSelectors.shimmer)
            clickButtonByValue('Chase')
            waitForLoader(loadingSelectors.shimmer)
            fillInputWithValue(iframeSelectors.plaidUsernameInput, 'user_good')
            fillInputWithValue(iframeSelectors.plaidPasswordInput, 'pass_good')
        })
        cy.intercept({ method: 'POST', url: 'https://api.segment.io/v1/m' }, { success: true }).as('nextStep')
        getIframeBody(iframeSelectors.plaidIframe).within(() => {
            clickButtonByValue('Submit')
            waitForLoader(loadingSelectors.shimmer)
            clickButtonByValue('Continue')
            waitForLoader(loadingSelectors.spin)
            clickButtonByValue('Continue')
        })

        cy.wait('@nextStep', { timeout: 60000 })

        checkButtonNotExists('Link Bank')
        checkProgressAndHeader('Link your business bank account', 2, 3)

        bankingFlowPage
            .selectBusinessBank('Plaid Checking')

        checkProgressAndHeader('Confirm your bank account', 3, 3)

        clickButtonByValue("Back");
        verifyNavigation("/deposit");
        checkProgressAndHeader('Link your business bank account', 2, 3)

        bankingFlowPage
            .selectBusinessBank('Plaid Checking')

        checkProgressAndHeader('Confirm your bank account', 3, 3)
        checkTheCheckbox('.checkbox', 'I have reviewed and accept the')
        verifyCheckbox('.checkbox', 'I have reviewed and accept the', true)
        checkButtonIsActive('Back')
        checkButtonIsActive('Finish')
        clickButtonByValue('Finish')

       signUpPage
           .selectItemFromNavbar('Invoices')

        checkMessage(messageSelectors.notificationDashboard,'Step completed')
        checkMessage(messageSelectors.notificationDashboard, 'Thank you for confirming your bank account.')

        // bankingFlowPage.checkCard('Add your bank', false)

        cy.checkCard().then(element => {
            if (element.text().includes('Add your bank')) {
                cy.log("Adding bank through `Add your bank` action card")
                bankingFlowPage
                    .selectCard("Add your bank", "Link");
            } else {
                bankingFlowPage.checkCard('Add your bank', false)
            }
        })

    })
})

Cypress.on('uncaught:exception', () => {
    return false
})