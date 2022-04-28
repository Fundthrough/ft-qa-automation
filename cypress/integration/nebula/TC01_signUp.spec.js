// <reference types="cypress" />
import {SignUpPage, signUpSelectors, signUpTexts} from "../../support/Page_Objects/signUpPage.js";
import {randomChars, randomLetter, randomNum} from "../../support/Helpers/common";
import {checkButtonIsActive, checkButtonIsDisabled, clickButtonByValue} from "../../support/Helpers/common/button";

Cypress.on('uncaught:exception', (err, runnable) => {
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
            .checkUserNameEmpty()

        checkButtonIsDisabled('Next')

        signUpPage
            .fillUserEmailInput("saksham+" + randomChars(5))
            .clickOnCard()
            .getErrorMsgInvalidEmail()

        checkButtonIsDisabled('Next')

        signUpPage
            .clearUserEmailInput()
            .checkUserNameEmpty()
            .fillUserEmailInput("saksham+" + randomChars(5) + "@")
            .clickOnCard()
            .getErrorMsgInvalidEmail()

        checkButtonIsDisabled('Next')

        signUpPage
            .fillUserEmailInput("saksham+" + randomChars(5) + "@")
            .clickOnCard()
            .getErrorMsgInvalidEmail()

        checkButtonIsDisabled('Next')

        signUpPage
            .clearUserEmailInput()
            .fillUserEmailInput("saksham+" + randomChars(5) + "@fundthrough")
            .clickOnCard()

        checkButtonIsDisabled('Next')

        signUpPage
            .getErrorMsgInvalidEmail()
            .clearUserEmailInput()

        checkButtonIsDisabled('Next')

        signUpPage
            .fillUserEmailInput("saksham+" + randomChars(5)+ "@fundthrough.co")
            .clickOnCard()

        checkButtonIsActive('Next')

        signUpPage.clearUserEmailInput()

    })

    it('Sign up with incorrect passwords', function () {
        const signUpPage = new SignUpPage();

        signUpPage
            .visit()
            .signupVerify()
            .checkUserNameEmpty()
            .fillUserEmailInput("saksham+" + randomChars(5) + "@fundthrough.com")

        checkButtonIsActive('Next')
        clickButtonByValue('Next')

        signUpPage
            .fillPasswordInput(randomNum(8))
            .revealPassword(true)
            .verifyRadioBtn(signUpSelectors.checkboxWrapper, signUpTexts.oneNumber, true)
            .verifyRadioBtn(signUpSelectors.checkboxWrapper, signUpTexts.oneLetter, false)
            .verifyRadioBtn(signUpSelectors.checkboxWrapper, signUpTexts.charLength, true)
            .clearPasswordInput()

        signUpPage
            .fillPasswordInput(randomNum(5))
            .verifyRadioBtn(signUpSelectors.checkboxWrapper,signUpTexts.oneNumber, true)
            .verifyRadioBtn(signUpSelectors.checkboxWrapper,signUpTexts.oneLetter, false)
            .verifyRadioBtn(signUpSelectors.checkboxWrapper,signUpTexts.charLength, false)
            .clearPasswordInput()

        signUpPage
            .fillPasswordInput(randomLetter(8))
            .verifyRadioBtn(signUpSelectors.checkboxWrapper,signUpTexts.oneNumber, false)
            .verifyRadioBtn(signUpSelectors.checkboxWrapper,signUpTexts.oneLetter, true)
            .verifyRadioBtn(signUpSelectors.checkboxWrapper,signUpTexts.charLength, true)
            .clearPasswordInput()

        signUpPage
            .fillPasswordInput(randomLetter(5))
            .verifyRadioBtn(signUpSelectors.checkboxWrapper,signUpTexts.oneNumber, false)
            .verifyRadioBtn(signUpSelectors.checkboxWrapper,signUpTexts.oneLetter, true)
            .verifyRadioBtn(signUpSelectors.checkboxWrapper,signUpTexts.charLength, false)
            .clearPasswordInput()
    })

    it('Sign Up with correct credentials', function () {
        const signUpPage = new SignUpPage();

        const email = "kristina+" + randomChars(4) + "@fundthrough.com";

        signUpPage
            .visit()
            .signupVerify()
            .checkUserNameEmpty()

        checkButtonIsDisabled('Next')


        //Verification of elements activation and Input on Sign Up page
        signUpPage
            .fillUserEmailInput(email)

        clickButtonByValue('Next')

        // signUpPage.checkUserEmailInput(email)

        signUpPage
            .saveUserEmail_LS()
            .fillPasswordInput('1Password')
            .revealPassword(true, '1Password')
            .verifyRadioBtn(signUpSelectors.checkboxWrapper,signUpTexts.oneNumber, true)
            .verifyRadioBtn(signUpSelectors.checkboxWrapper,signUpTexts.oneLetter, true)
            .verifyRadioBtn(signUpSelectors.checkboxWrapper,signUpTexts.charLength, true)
            .checkTermsAndCond()
            .uncheckTermsAndCond()
            .checkErrorMsgTermsAndCond()
            .checkTermsAndCond()

        clickButtonByValue('Next')

        //redirects to /onboarding flow
        signUpPage
            .checkOnboardingDirectionUrl()
        //Step 1 page validation
            .checkOnboardStep(1)
            .checkQuickBooksHeader()
            .checkImage()
            .skipQuickBooksStep()

        cy.intercept({ method: 'POST', url: 'https://api.segment.io/v1/p' }, { success: true }).as('nextStep')
        cy.wait('@nextStep', { timeout: 15000 })
        // //Step 2 page validation
        signUpPage
            .checkOnboardStep(2)
            .checkTooltip('Business Legal Name', signUpTexts.businessLegalName)
            .inputBusinessName(randomChars(4))
            .verifyRadioBtn('.checkbox','This is also what my customers call my business.', true)

        clickButtonByValue('Next')

        //redirects to Step 3 and fills in Company Address info
        cy.wait('@nextStep', { timeout: 25000 })

        signUpPage
            .checkOnboardStep(3)
            .fillBusinessAddressInput('Business Address', '100 test street')
            .checkAddressField()
            .fillCityNameInput('Cary')
            .selectCountry("USA")
            .selectProvince('West Virginia')
            .checkTooltip('Business Address', signUpTexts.businessAddress)
            .selectPostalCode('12345')

        clickButtonByValue('Next')


        cy.wait('@nextStep', { timeout: 25000 })
        signUpPage
            .checkOnboardStep(4)
            .fillPhoneNumber('6470001234')
            .checkTooltip('Contact Phone',signUpTexts.contactPhone)

        clickButtonByValue('Next')

        cy.wait('@nextStep', { timeout: 25000 })
        signUpPage
            .checkOnboardStep(5)
            .fillPrefName(randomChars(4))
            .fillFirstName(randomChars(4))
            .fillLastName(randomChars(4))
            .checkTooltip('Legal First Name', signUpTexts.firstName)
            .checkTooltip('Preferred First Name', signUpTexts.firstName)

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
