// <reference types="cypress" />
import {SignUpPage, signUpSelectors, signUpTexts} from "../../support/Page_Objects/signUpPage.js";
import {randomChars, randomLetter, randomNum} from "../../support/Helpers/common";
import {
    checkButtonIsActive,
    checkButtonIsDisabled,
    clickButtonByValue,
    verifyCheckbox
} from "../../support/Helpers/common/button";
import {checkErrorMessage, messageTexts} from "../../support/Helpers/common/messages";
import {checkTooltip, tooltipTexts} from "../../support/Helpers/common/tooltip";
import {
    checkEmptyInput,
    checkInputValue,
    clearInputValue,
    fillInputWithValue,
    inputSelectors
} from "../../support/Helpers/common/input";

Cypress.on('uncaught:exception', () => {
    return false;
});

describe('Sign Up page', () => {
    beforeEach(() => {
        cy.clearLocalStorage()
    })

    it('Sign Up with incorrect email formats', function () {
        const signUpPage = new SignUpPage();

        signUpPage
            .visit()
            .signupVerify()

        checkEmptyInput(inputSelectors.email)
        checkButtonIsDisabled('Next')

        fillInputWithValue(inputSelectors.email, "techadmin" + randomChars(5))

        signUpPage
            .clickOnCard()

        checkErrorMessage(messageTexts.emailError)
        checkButtonIsDisabled('Next')
        clearInputValue(inputSelectors.email)
        checkEmptyInput(inputSelectors.email)
        fillInputWithValue(inputSelectors.email, "techadmin" + randomChars(5) + "@")

        signUpPage
            .clickOnCard()

        checkErrorMessage(messageTexts.emailError)
        checkButtonIsDisabled('Next')

        fillInputWithValue(inputSelectors.email, "techadmin" + randomChars(5) + "@")

        signUpPage
            .clickOnCard()

        checkErrorMessage(messageTexts.emailError)
        checkButtonIsDisabled('Next')

        clearInputValue(inputSelectors.email)
        fillInputWithValue(inputSelectors.email, "techadmin" + randomChars(5) + "@fundthrough")

        signUpPage
            .clickOnCard()

        checkButtonIsDisabled('Next')
        checkErrorMessage(messageTexts.emailError)
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

        signUpPage
            .visit()
            .signupVerify()

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

        signUpPage
            .visit()
            .signupVerify()

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

        checkErrorMessage(messageTexts.termsAndConditions)

        signUpPage
            .checkTermsAndCond()

        clickButtonByValue('Next')

        signUpPage
            .checkOnboardingDirectionUrl()
        //Step 1 page validation
            .checkOnboardStep(1)
            .checkQuickBooksHeader()
            .checkImage()
            .skipQuickBooksStep()

        cy.intercept({ method: 'POST', url: 'https://api.segment.io/v1/p' }, { success: true }).as('nextStep')
        cy.wait('@nextStep', { timeout: 25000 })
        // //Step 2 page validation
        signUpPage
            .checkOnboardStep(2)

        fillInputWithValue(inputSelectors.businessName, randomChars(4))
        verifyCheckbox(signUpSelectors.checkbox, signUpTexts.customerCallCheckbox, true)
        checkTooltip('Business Legal Name', tooltipTexts.businessLegalName)

        clickButtonByValue('Next')

        //redirects to Step 3 and fills in Company Address info
        cy.wait('@nextStep', { timeout: 25000 })

        // Should be uncommented after fixing the issue with step
        // signUpPage
            // .checkOnboardStep(3)

        fillInputWithValue(inputSelectors.mainAddress, '100 test street')
        checkEmptyInput(inputSelectors.secondAddress)
        fillInputWithValue(inputSelectors.city, 'Cary')
        fillInputWithValue(inputSelectors.postalCode, '12345')

        signUpPage
            .selectCountry("USA")
            .selectProvince('West Virginia')


        checkTooltip('Business Address', tooltipTexts.businessAddress)

        clickButtonByValue('Next')


        cy.wait('@nextStep', { timeout: 25000 })
        signUpPage
            .checkOnboardStep(4)

        fillInputWithValue(inputSelectors.phoneNumber, '6470001234')
        checkTooltip('Contact Phone',tooltipTexts.contactPhone)
        clickButtonByValue('Next')

        cy.wait('@nextStep', { timeout: 25000 })
        signUpPage
            .checkOnboardStep(5)

        fillInputWithValue(inputSelectors.preferredName, randomChars(4))
        fillInputWithValue(inputSelectors.firstName, randomChars(4))
        fillInputWithValue(inputSelectors.lastName, randomChars(4))
        checkTooltip('Legal First Name', tooltipTexts.firstName)
        checkTooltip('Preferred First Name', tooltipTexts.firstName)
        clickButtonByValue('Next')

        signUpPage
            .checkHeardAboutUsInput()

        clickButtonByValue('Skip')
        cy.wait('@nextStep', { timeout: 25000 })

        signUpPage
            .logOut()
            .signupVerify()
    })
})
