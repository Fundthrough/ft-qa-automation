import SigninElements from '../../support/Page_Objects/SigninElements.js';

describe('Signin Validation', () => {
    beforeEach(function () {
        cy.visit('/signin')
        cy.clearLocalStorage()
        cy.fixture('profile').then(function (user) {
            this.user = user;
        })
    })

    const emails = (val) => {
        var email = "";
        var possible = "abcd@.fundthrough.com";
        for (var i = 0; i < val; i++) {
            email += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return email;
    }
    const TestEmail = emails(9)
    const PasswordInvalid = emails(9)
    const InvalidTextPassword = emails(4)
    const signinElements = new SigninElements();

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
    //     cy.intercept({ method: 'POST', url: 'https://api.segment.io/v1/p' }, { success: true }).as('nextStep')
    //     cy.wait('@nextStep', { timeout: 60000 })
    //     // //Step 2 page validation
    //     checkProgressAndHeader("What is your business’s legal name?", 2, 6)
    //     fillInputWithValue(inputSelectors.businessName, randomChars(4))
    //     verifyCheckbox(signUpSelectors.checkbox, signUpTexts.customerCallCheckbox, true)
    //     checkTooltip(tooltipSelectors.inputLabel, 'Business Legal Name', tooltipTexts.businessLegalName)
    //     clickButtonByValue('Next')
    //
    //     //redirects to Step 3 and fills in Company Address info
    //     cy.wait('@nextStep', { timeout: 60000 })
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
    //     checkTooltip(tooltipSelectors.inputLabel,'Business Address', tooltipTexts.businessAddress)
    //
    //     clickButtonByValue('Next')
    //
    //     cy.wait('@nextStep', { timeout: 60000 })
    //
    //     checkProgressAndHeader('How can we reach you?', 4, 6)
    //     fillInputWithValue(inputSelectors.phoneNumber, '6470001234')
    //     checkTooltip(tooltipSelectors.inputLabel, 'Contact Phone',tooltipTexts.contactPhone)
    //     clickButtonByValue('Next')
    //
    //     cy.wait('@nextStep', { timeout: 60000 })
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
    //     cy.wait('@nextStep', { timeout: 60000 })
    //
    //     waitForLoader(loadingSelectors.loaderDefault)
    //
    //     signUpPage
    //         .logOut()
    //
    //     verifyNavigation('signin')
    //
    // })

    it('SignIn with Valid Credential', function () {
        cy.login(this.user.username, this.user.password)
        // signinElements.usercredential.getskipcontainer().click({ force: true })
        // cy.intercept('POST', '/v1/t', {}).as('userSignin')
        //cy.intercept('POST', '/v1/p', {}).as('addinvoice')
        /*cy.wait('@userSignin', { timeout: 20000 })*/
            .then(($div) => {
                signinElements.velocitydashboard.getyellowactioncard()


                signinElements.velocitydashboard.getallctioncard().should(($i) => {
                    //expect($i).to.have.length(4)
                    //expect($i).to.contain('Add your first invoice')
                    expect($i).to.contain('Tell us about your business')
                    expect($i).to.contain('Review the funding agreement')
                    expect($i).to.contain('Add your bank')
                })
            })
    })


    it("Sign In with invalid Credentials", function () {
        signinElements.usercredential.getusername().type(this.user.username)
        signinElements.usercredential.getpassword().type(PasswordInvalid)
        signinElements.usercredential.getskipcontainer().click({ force: true })
        //give element 10 seconds to appear
        cy.get('[data-test=authenticator-error] > span',
            { timeout: 10000 })
            .should('be.visible');

        //signin with invalid data
        cy.request({
            url: 'https://cognito-idp.us-east-1.amazonaws.com/',
            failOnStatusCode: false,
            method: 'POST',
        }).then((resp) => {
            expect(resp.status).to.eq(400)
        })
    })

    it("Input invalid Data on username and password", function () {
        signinElements.usercredential.getusername().type(TestEmail)
        signinElements.usercredential.getpassword().type(InvalidTextPassword)
        // signinElements.usercredential.getskipcontainer().click({ force: true })
        cy.get('input').then(($input) => {
            if ($input.hasClass('bordered__error')) {
                signinElements.usercredential.fieldlevelerror().should('be.visible');
            } else {
                signinElements.usercredential.fieldlevelerror().should('not.be.visible');
            }
        })
    })

    Cypress.on('uncaught:exception', (err, runnable) => {
        return false
    })

})
  
