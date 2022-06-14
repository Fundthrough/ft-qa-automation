//<reference types="cypress" />
import { SignInPage } from '../../support/Page_Objects/signInElements_new.js'
import {
    visit,
    verifyRedirection,
    verifyNavigation,
    clickBackArrow,
    reload,
} from '../../support/Helpers/common/navigation'
import { verifyTitle } from '../../support/Helpers/common/title'
import {
    clearInputValue,
    fillInputWithValue,
    inputSelectors,
    verifyInputLabels,
    signInLabels,
} from '../../support/Helpers/common/input'
import {
    checkButtonIsActive,
    checkButtonIsDisabled,
    clickButtonByValue,
} from '../../support/Helpers/common/button'
import {
    checkMessage,
    messageSelectors,
    messageTexts,
} from '../../support/Helpers/common/messages'
import { randomChars } from '../../support/Helpers/common.js'

describe('Sign In Page', function test() {
    beforeEach(() => {
        cy.fixture('profile.json').then(function (user) {
            this.user = user
        })
    })

    it('Sign In page format', function () {
        const signInPage = new SignInPage()

        visit('/signin')

        signInPage.verifySignIn().verifyImage()

        verifyTitle('Sign In')
        //verifyRedirection()
        verifyInputLabels(signInLabels)

        signInPage
            .verifyStyling('Email')
            .verifyStyling('Password')
            .verifyForgotPwdText()
            .clickForgotPwd()

        verifyNavigation('/forgot-password')
        verifyTitle('Reset your password')
        //Invalid email format
        clearInputValue(inputSelectors.email)
        fillInputWithValue(
            inputSelectors.email,
            'techadmin' + randomChars(3) + '@fundthrough'
        )
        checkButtonIsDisabled('Send Code')
        clickButtonByValue('Send Code')
        checkMessage(messageSelectors.error, messageTexts.emailError)
        //Incorrect email
        clearInputValue(inputSelectors.email)
        fillInputWithValue(
            inputSelectors.email,
            'techadmin' + randomChars(4) + '@fundthrough.com'
        )
        clickButtonByValue('Send Code')

        signInPage.resetEmailError()

        //Send code to the correct email address
        clearInputValue(inputSelectors.email)
        fillInputWithValue(inputSelectors.email, this.user.username)
        checkButtonIsActive('Send Code')
        //clickButtonByValue("Send Code");
        //To discuss and setup an email server to validate the email code
        clickBackArrow('BACK')
        verifyNavigation('/signin')

        signInPage.verifySignIn().verifySignUpPage()
    })

    it('Sign In with incorrect emails', () => {
        visit('/signin')

        //attempt one
        fillInputWithValue(
            inputSelectors.email,
            'techadmin' + randomChars(5) + 'fundthrough'
        )
        clickButtonByValue('Sign In')
        checkMessage(messageSelectors.error, messageTexts.emailError)
        clearInputValue(inputSelectors.email)

        //attempt two
        fillInputWithValue(
            inputSelectors.email,
            'techadmin' + randomChars(3) + '@com'
        )
        clickButtonByValue('Sign In')
        checkMessage(messageSelectors.error, messageTexts.emailError)
        clearInputValue(inputSelectors.email)

        //attempt three
        fillInputWithValue(
            inputSelectors.email,
            'techadmin' + randomChars(2) + '@fundthrough'
        )
        clickButtonByValue('Sign In')
        checkMessage(messageSelectors.error, messageTexts.emailError)
        clearInputValue(inputSelectors.email)

        //empty input
        clickButtonByValue('Sign In')
        checkMessage(messageSelectors.error, messageTexts.emailError)
    })

    it('Sign In with incorrect passwords', () => {
        visit('/signin')

        //attempt one
        fillInputWithValue(inputSelectors.password, randomChars(4))
        clickButtonByValue('Sign In')
        checkMessage(messageSelectors.error, messageTexts.passwordError)
        clearInputValue(inputSelectors.password)

        //attempt two
        fillInputWithValue(inputSelectors.password, randomChars(7))
        clickButtonByValue('Sign In')
        checkMessage(messageSelectors.error, messageTexts.passwordError)
        clearInputValue(inputSelectors.password)

        //attempt three
        fillInputWithValue(inputSelectors.password, '1')
        clickButtonByValue('Sign In')
        checkMessage(messageSelectors.error, messageTexts.passwordError)
    })

    it('Sign In with incorrect credentials', function () {
        const signInPage = new SignInPage()

        //incorrect username
        visit('/signin')
        fillInputWithValue(
            inputSelectors.email,
            'techadmin' + randomChars(4) + '@fundthrough.com'
        )
        fillInputWithValue(inputSelectors.password, this.user.password)
        clickButtonByValue('Sign In')

        signInPage.authenticationError()

        //incorrect password
        Cypress._.times(5, () => {
            clearInputValue(inputSelectors.email)
            clearInputValue(inputSelectors.password)
            fillInputWithValue(inputSelectors.email, this.user.username)
            fillInputWithValue(inputSelectors.password, randomChars(10))
            clickButtonByValue('Sign In')
        })
    })

    it('Sign In with valid credentials', function () {
        reload()
        cy.login(this.user.username, this.user.password)
        verifyNavigation('/invoices')
    })
})
