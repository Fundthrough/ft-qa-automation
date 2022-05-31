import {BankingFlowPage} from "../../support/Page_Objects/dashboard/bankingFlow";
import {checkHeaderText, checkProgressAndHeader} from "../../support/Helpers/common/title";
import {
    checkButtonIsActive,
    checkButtonIsDisabled, checkTheCheckbox,
    clickButtonByValue,
    verifyCheckbox
} from "../../support/Helpers/common/button";
import {getIframeBody, iframeSelectors, loadingSelectors} from "../../support/Helpers/common/iframe";
import {checkEmptyInput, checkInputValue, fillInputWithValue, inputSelectors} from "../../support/Helpers/common/input";
import {SignUpPage, signUpSelectors, signUpTexts} from "../../support/Page_Objects/signUpPage";
import {randomChars} from "../../support/Helpers/common";
import {verifyNavigation, visit} from "../../support/Helpers/common/navigation";
import {checkErrorMessage, messageTexts} from "../../support/Helpers/common/messages";
import {checkTooltip, tooltipSelectors, tooltipTexts} from "../../support/Helpers/common/tooltip";

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
    //
    //     signUpPage
    //         .checkDashboardIsLoaded()
    //         .logOut()
    //
    //     verifyNavigation('signin')
    // })

    it('Valid Banking Flow form submission', function () {
        const bankingFlowPage = new BankingFlowPage();
        cy.login(this.user.username, this.user.password)

        bankingFlowPage
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
            cy.get('[data-testid="shimmer-loading-pane"]').should('not.exist')
            clickButtonByValue('Chase')
            cy.get('[data-testid="shimmer-loading-pane"]').should('not.exist')
            fillInputWithValue('#aut-input-0', 'user_good')
            fillInputWithValue('#aut-input-1', 'pass_good')
        })
        cy.intercept({ method: 'POST', url: 'https://api.segment.io/v1/m' }, { success: true }).as('nextStep')
        getIframeBody(iframeSelectors.plaidIframe).within(() => {
            clickButtonByValue('Submit')
            cy.get(loadingSelectors.shimmer).should('exist')
            cy.get(loadingSelectors.shimmer).should('not.exist')
            // cy.wait(2000)
            clickButtonByValue('Continue')
            cy.get(loadingSelectors.spin).should('exist')
            cy.get(loadingSelectors.spin).should('not.exist')
            // cy.wait(2000)
            clickButtonByValue('Continue')
        })

        // cy.wait('@nextStep', { timeout: 60000 })
        //
        // checkProgressAndHeader('Link your business bank account', 2, 3)
        //
        // cy.get('.link-bank').find('b').contains('Plaid Checking').parents('.left-float').siblings().then(() => {
        //     clickButtonByValue('Select')
        //     cy.get('button').contains('Select').should('not.exist')
        // })
        //
        // checkProgressAndHeader('Confirm your bank account', 3, 3)
        // checkTheCheckbox('.checkbox', 'I have reviewed and accept the')
        // verifyCheckbox('.checkbox', 'I have reviewed and accept the', true)
        // checkButtonIsActive('Back')
        // checkButtonIsActive('Finish')
        // clickButtonByValue('Finish')
        //
        // cy.get(signUpSelectors.navbar).click()
        // cy.get(signUpSelectors.navContent)
        //     .should('be.visible')
        //     .contains('Invoices')
        //     .click()

        // bankingFlowPage.checkCard('', '')





        // getIframeBody(iframeSelectors.plaidIframe).within(() => {
        //     cy.get('[data-testid="shimmer-loading-pane"]').should('not.exist')
        //     clickButtonByValue('Continue')
        //
        // })






        // clickButtonByValue('Continue')

    })
})

Cypress.on('uncaught:exception', (err, runnable) => {
    return false
})