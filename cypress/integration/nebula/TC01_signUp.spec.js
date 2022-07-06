// <reference types="cypress" />
import {SignUpPage, signUpSelectors, signUpTexts} from "../../support/Page_Objects/signUpPage.js";
import {randomChars, randomLetter, randomNum} from "../../support/Helpers/common";
import {checkMessage, messageSelectors, messageTexts} from "../../support/Helpers/common/messages";
import {
    checkButtonIsActive,
    checkButtonIsDisabled,
    clickButtonByValue,
    verifyCheckbox
} from "../../support/Helpers/common/button";
import {navigateBack, verifyNavigation, verifyRedirection, visit} from "../../support/Helpers/common/navigation";
import {
    checkEmptyInput,
    checkInputValue,
    clearInputValue,
    fillInputWithValue,
    inputSelectors
} from "../../support/Helpers/common/input";
import {checkProgressAndHeader} from "../../support/Helpers/common/title";
import {checkTooltip, tooltipSelectors, tooltipTexts} from "../../support/Helpers/common/tooltip";
import {loadingSelectors, waitForLoader} from "../../support/Helpers/common/iframe";

Cypress.on('uncaught:exception', () => {
    return false;
});

describe('Sign Up page', () => {
    beforeEach(() => {
        cy.clearLocalStorage()
    })

    it('Sign Up with incorrect email formats', function () {
        const signUpPage = new SignUpPage();

        visit('/signup')
        verifyNavigation('signup')
        verifyRedirection(0, 'FundThrough')
        verifyRedirection(4, 'Intuit Accounts - Sign In')
        navigateBack()
        checkEmptyInput(inputSelectors.email)
        checkButtonIsDisabled('Next')

        fillInputWithValue(inputSelectors.email, "techadmin" + randomChars(5))

        signUpPage
            .clickOnCard()

        checkMessage(messageSelectors.error, messageTexts.emailError)
        checkButtonIsDisabled('Next')
        clearInputValue(inputSelectors.email)
        checkEmptyInput(inputSelectors.email)
        fillInputWithValue(inputSelectors.email, "techadmin" + randomChars(5) + "@")

        signUpPage
            .clickOnCard()

        checkMessage(messageSelectors.error, messageTexts.emailError)
        checkButtonIsDisabled('Next')

        fillInputWithValue(inputSelectors.email, "techadmin" + randomChars(5) + "@")

        signUpPage
            .clickOnCard()

        checkMessage(messageSelectors.error, messageTexts.emailError)
        checkButtonIsDisabled('Next')

        clearInputValue(inputSelectors.email)
        fillInputWithValue(inputSelectors.email, "techadmin" + randomChars(5) + "@fundthrough")

        signUpPage
            .clickOnCard()

        checkButtonIsDisabled('Next')
        checkMessage(messageSelectors.error, messageTexts.emailError)
        clearInputValue(inputSelectors.email)
        checkButtonIsDisabled('Next')
        fillInputWithValue(inputSelectors.email, "techadmin" + randomChars(5)+ "@fundthrough.co")

        signUpPage
            .clickOnCard()

        checkButtonIsActive('Next')

        clearInputValue(inputSelectors.email)

    })

    it('Sign up with incorrect passwords', function () {
        const signUpPage = new SignUpPage();

        visit('/signup')
        verifyNavigation('signup')
        checkEmptyInput(inputSelectors.email)
        fillInputWithValue(inputSelectors.email, "techadmin" + randomChars(5) + "@fundthrough.com")
        checkButtonIsActive('Next')
        clickButtonByValue('Next')
        fillInputWithValue(inputSelectors.password, randomNum(8))

        signUpPage
            .revealPassword(true)

        verifyCheckbox(signUpSelectors.checkboxWrapper, signUpTexts.oneNumber, true)
        verifyCheckbox(signUpSelectors.checkboxWrapper, signUpTexts.oneLetter, false)
        verifyCheckbox(signUpSelectors.checkboxWrapper, signUpTexts.charLength, true)
        clearInputValue(inputSelectors.password)
        fillInputWithValue(inputSelectors.password, randomNum(5))
        verifyCheckbox(signUpSelectors.checkboxWrapper, signUpTexts.oneNumber, true)
        verifyCheckbox(signUpSelectors.checkboxWrapper, signUpTexts.oneLetter, false)
        verifyCheckbox(signUpSelectors.checkboxWrapper, signUpTexts.charLength, false)
        clearInputValue(inputSelectors.password)
        fillInputWithValue(inputSelectors.password, randomLetter(8))
        verifyCheckbox(signUpSelectors.checkboxWrapper, signUpTexts.oneNumber, false)
        verifyCheckbox(signUpSelectors.checkboxWrapper, signUpTexts.oneLetter, true)
        verifyCheckbox(signUpSelectors.checkboxWrapper, signUpTexts.charLength, true)
        clearInputValue(inputSelectors.password)
        fillInputWithValue(inputSelectors.password, randomLetter(5))
        verifyCheckbox(signUpSelectors.checkboxWrapper, signUpTexts.oneNumber, false)
        verifyCheckbox(signUpSelectors.checkboxWrapper, signUpTexts.oneLetter, true)
        verifyCheckbox(signUpSelectors.checkboxWrapper, signUpTexts.charLength, false)
        clearInputValue(inputSelectors.password)
    })

    it('Sign Up with correct credentials', function () {
        const signUpPage = new SignUpPage();

        const email = "techadmin" + randomChars(4) + "@fundthrough.com";

        visit('/signup')
        verifyNavigation('signup')
        checkEmptyInput(inputSelectors.email)
        checkButtonIsDisabled('Next')
        fillInputWithValue(inputSelectors.email, email)
        clickButtonByValue('Next')
        checkInputValue(inputSelectors.email, email)

        signUpPage
            .saveUserEmail_LS()

        fillInputWithValue(inputSelectors.password, '1Password')

        signUpPage
            .revealPassword(true, '1Password')

        verifyCheckbox(signUpSelectors.checkboxWrapper, signUpTexts.oneNumber, true)
        verifyCheckbox(signUpSelectors.checkboxWrapper, signUpTexts.oneLetter, true)
        verifyCheckbox(signUpSelectors.checkboxWrapper, signUpTexts.charLength, true)

        signUpPage
            .checkTermsAndCond()
            .uncheckTermsAndCond()

        checkMessage(messageSelectors.error, messageTexts.termsAndConditions)

        signUpPage
            .checkTermsAndCond()

        clickButtonByValue('Next')

        signUpPage
            .checkOnboardingDirectionUrl()

        checkProgressAndHeader('Connect to your invoicing software', 1, 6)
        //Step 1 page validation
        signUpPage
            .checkQuickBooksHeader()
            .checkImage()
            .skipQuickBooksStep()

        cy.intercept({ method: 'POST', url: 'https://api.segment.io/v1/p' }, { success: true }).as('nextStep')
        cy.wait('@nextStep', { timeout: 60000 })
        // //Step 2 page validation
        checkProgressAndHeader("What is your business’s legal name?", 2, 6)
        fillInputWithValue(inputSelectors.businessName, randomChars(4))
        verifyCheckbox(signUpSelectors.checkbox, signUpTexts.customerCallCheckbox, true)
        checkTooltip(tooltipSelectors.inputLabel, 'Business Legal Name', tooltipTexts.businessLegalName)
        clickButtonByValue('Next')

        //redirects to Step 3 and fills in Company Address info
        cy.wait('@nextStep', { timeout: 60000 })

        // Should be uncommented after fixing the issue with step
        // checkProgressAndHeader('Where is your business located?', 3, 6)

        fillInputWithValue(inputSelectors.mainAddress, '100 test street')
        checkEmptyInput(inputSelectors.secondAddress)
        fillInputWithValue(inputSelectors.city, 'Cary')
        fillInputWithValue(inputSelectors.postalCode, '12345')

        signUpPage
            .selectCountry("USA")
            .selectProvince('West Virginia')

        checkTooltip(tooltipSelectors.inputLabel,'Business Address', tooltipTexts.businessAddress)
        clickButtonByValue('Next')

        cy.wait('@nextStep', { timeout: 60000 })

        checkProgressAndHeader('How can we reach you?', 4, 6)
        fillInputWithValue(inputSelectors.phoneNumber, '6470001234')
        checkTooltip(tooltipSelectors.inputLabel, 'Contact Phone',tooltipTexts.contactPhone)
        clickButtonByValue('Next')

        cy.wait('@nextStep', { timeout: 60000 })

        checkProgressAndHeader("What's your name?", 5, 6)
        fillInputWithValue(inputSelectors.preferredName, randomChars(4))
        fillInputWithValue(inputSelectors.firstName, randomChars(4))
        fillInputWithValue(inputSelectors.lastName, randomChars(4))
        checkTooltip(tooltipSelectors.inputLabel, 'Legal First Name', tooltipTexts.firstName)
        checkTooltip(tooltipSelectors.inputLabel, 'Preferred First Name', tooltipTexts.firstName)

        clickButtonByValue('Next')

        signUpPage
            .checkHeardAboutUsInput()

        checkProgressAndHeader("How did you hear about us? (Optional)", 6, 6)

        clickButtonByValue('Skip')
        cy.wait('@nextStep', { timeout: 60000 })

        waitForLoader(loadingSelectors.loaderDefault)

        signUpPage
            .logOut()

    verifyNavigation('signin')

    })
})
