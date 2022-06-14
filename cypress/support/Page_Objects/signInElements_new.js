export const signInSelectors = {
    image: '.ui.image',
    label: '.input-label',
    forgotPwd: '.forgot-password',
    signUp: '.signup_prompt_parent > p',
    authenticate: '[data-test=authenticator-error]',
    button: 'button',
    backbutton: '.green-text',
    content: '.content',
}

export const signInTexts = {
    email: 'Business Email',
    password: 'Password',
    forgotPassword: 'Forgot your password?',
    forgotPasswordUrlText: 'forgot-password',
    resetPwd: 'Reset your password',
    signInButton: 'Sign In',
    emailText: 'Email',
    signUpText: "Don't have an account?Sign Up",
    code: 'Send Code',
    resetText:
        'Reset Password FailedPlease recheck your email and try again. If the issue persists reach out to support or check with the partner sign in page (eg: QuickBooks). ',
}

export class SignInPage {
    verifySignIn() {
        cy.get('.u-p').should('be.visible')

        return this
    }

    verifyImage() {
        cy.get(signInSelectors.image).each((image) => {
            cy.wrap(image).should('be.visible')
        })

        return this
    }

    verifyStyling(name) {
        cy.get(signInSelectors.label)
            .contains(name)
            .should('have.css', 'color', 'rgb(17, 75, 95)')
            .and('have.css', 'font-weight', '700')

        return this
    }

    verifyForgotPwdText() {
        cy.get(signInSelectors.forgotPwd).should(
            'contain',
            signInTexts.forgotPassword
        )

        return this
    }

    clickForgotPwd() {
        cy.get(signInSelectors.forgotPwd).click()
        cy.get(signInSelectors.label).should('contain', signInTexts.emailText)
        cy.get(signInSelectors.button)
            .should('be.disabled')
            .and('contain', signInTexts.code)

        return this
    }

    resetEmailError() {
        cy.get(signInSelectors.content)
            .invoke('text')
            .then((text) => {
                expect(text).to.equal(signInTexts.resetText)
            })
    }

    verifySignUpPage() {
        cy.get(signInSelectors.signUp)
            .invoke('text')
            .then((text) => {
                expect(text).to.equals(signInTexts.signUpText)
            })
        cy.get(signInSelectors.signUp)
            .find('a')
            .should('have.attr', 'href', '/signup')
            .invoke('attr', 'href')
            .then((href) => cy.request(href).its('status').should('eq', 200))

        return this
    }

    authenticationError() {
        cy.get(signInSelectors.authenticate)
            .invoke('text')
            .then((text) => {
                expect(text).to.be.oneOf([
                    'Invalid credentials.',
                    'Incorrect username or password',
                    'Please reach out to support to log in',
                ])
            })

        return this
    }
}
