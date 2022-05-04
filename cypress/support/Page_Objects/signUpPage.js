export const signUpSelectors = {
    signUpPage: '.sign-up-value-flow',
    checkboxWrapper: '[class="inline fields"]',
    signUpCard: '[id="card-page-content"]',
    userEmail: '#username',
    userPassword: '#password',
    eyeIcon: '.icon-b-preview-16',
    termsAndConditions: '[name="termsAndConditions"]',
    stepContainer: '#ft-card-next-gen',
    currentStep: '.fund-step',
    imageQuickBooks: '.ui > img',
    quickBooksSkip: '[class="skip-container u-mb0"]',
    tooltipIcon: '.question',
    tooltipDescription: '.description',
    businessName: '#businessName',
    locationForm: '#locationForm',
    mainAddress: '#address',
    secondAddress: '#addressTwo',
    city: '#city',
    country: '#country',
    province: '#province',
    postalCode: '#postalCode',
    phoneNumber: '#phoneNumber',
    dropdown: '.dropdown',
    navbar: '.bars',
    navHeader: '.flex-left > .ui',
    navSettings: '[href="/settings"]',
    navContent: '[href="/account"] > div',
    cardContentHeader: '.card-content-left',
    menuContainerInvoice: '.menu-container',
    companyName: '.accordion__company-name',
    logOut: '.accordion__content_button',
    heardAboutUs: '#howYouHeardAboutUs',
    firstName: '#firstName',
    lastName: '#lastName',
    preferredName: '#preferredName',
    checkbox: '.checkbox'
};

export const signUpTexts = {
    oneNumber: 'have at least one number',
    oneLetter: 'have at least one letter',
    charLength: 'be 8 or more characters long',
    termsAndConditions: 'Please indicate that you have read and agree to the Terms and Conditions and Privacy Policy.',
    quickBooksHeader: 'Add your invoices from QuickBooks and start funding them in less than 24 hours.',
    businessLegalName: 'To get started, what is the registered name of your business? This is the name that you use on government documents and tax filings.',
    businessAddress: 'We use your address to verify your business. If you have multiple locations, enter where your business was registered.',
    contactPhone: 'To keep you in the loop on your funding progress, please provide your business’s phone number. If it’s easier, you can provide your direct line.',
    firstName: 'To verify your identity, we need to know your legal name. This should match your government-issued ID. We’ll use your preferred name to communicate with you.',
    skipQuickBooks: "SKIP/ I DON'T USE QUICKBOOK",
    accountSetupBusiness: 'Tell us about your business',
    accountSetupFunding: 'Review the funding agreement',
    accountSetupDeposit: 'Provide deposit information',
    customerCallCheckbox: 'This is also what my customers call my business.'
};

export class SignUpPage {

    visit() {
        cy.visit('/signup')
        cy.url().should('include', 'signup')

        return this;
    }

    signupVerify() {
        cy.get(signUpSelectors.signUpCard).should('exist')

        return this;
    }

    checkUserNameEmpty() {
        cy.get(signUpSelectors.userEmail)
            .find('[value]')
            .should(($el) => {
                expect($el.text().trim()).equal('')
        })

        return this;
    }

    clickOnCard() {
        cy.get(signUpSelectors.signUpCard).click()

        return this;
    }

    fillUserEmailInput(email) {
        cy.get(signUpSelectors.userEmail).type(email)

        return this;
    }

    checkUserEmailInput(email) {
        cy.get(signUpSelectors.userEmail).should('have.value', email)

        return this;
    }

    clearUserEmailInput() {
        cy.get(signUpSelectors.userEmail).clear()

        return this;
    }

    revealPassword(reveal = false) {
        cy.get(signUpSelectors.eyeIcon).should('be.visible').click().then(Password => {
            cy.wrap(Password)
                .should(reveal ? 'be.visible' : 'not.be.visible')
            })
        cy.get(signUpSelectors.userPassword)
            .invoke('attr', 'type')
            .should('eq', 'text')

        return this;
    }

    fillPasswordInput(password) {
        cy.get(signUpSelectors.userPassword)
            .should('be.visible')
            .type(password)

        return this;
    }

    clearPasswordInput() {
        cy.get(signUpSelectors.userPassword)
            .should('be.visible')
            .clear()

        return this;
    }
 
    saveUserEmail_LS(){
        cy.get(signUpSelectors.userEmail).then(elem => {
            const emailInputValue = Cypress.$(elem).val()
            cy.writeFile('./cypress/fixtures/profile.json', { username: emailInputValue, password: '1Password' })
        });
    return this;
    }

    verifyRadioBtn(checkbox, checkboxTitle, checked = false) {
        cy.get(checkbox)
            .find('label')
            .then(radioButtons => {
                cy.wrap(radioButtons)
                    .contains(checkboxTitle)
                    .siblings()
                    .should(checked ? 'be.checked' : 'not.be.checked')
        })

        return this;
    }

    checkTermsAndCond() {
        cy.get(signUpSelectors.termsAndConditions).check({force: true})

        return this;
    }

    uncheckTermsAndCond() {
        cy.get(signUpSelectors.termsAndConditions).uncheck({force: true})

        return this;
    }

    checkOnboardingDirectionUrl() {
        cy.intercept('POST', '/v1/t', {}).as('url')
        cy.wait('@url', { timeout: 15000 }).then(() => {
            cy.url().should('include', '/onboarding')
        })

        return this;
    }

    checkOnboardStep(currentStep) {
        cy.get(signUpSelectors.stepContainer)
            .find(signUpSelectors.currentStep)
            .should('contain', `Step ${currentStep} of 6`)

        return this;
    }

    checkQuickBooksHeader () {
        cy.get('.bold-text').should('contain', signUpTexts.quickBooksHeader)

        return this;
    }

    checkImage() {
        cy.get(signUpSelectors.imageQuickBooks).should('be.visible')

        return this;
    }


    skipQuickBooksStep() {
        cy.get(signUpSelectors.quickBooksSkip)
            .contains(signUpTexts.skipQuickBooks)
            .click()

        return this;
    }

    checkTooltip(tooltipLabel, tooltipMessage) {
        cy.get('.input-label')
            .contains(tooltipLabel)
            .within(() => {
                cy.get(signUpSelectors.tooltipIcon).trigger('mouseover')
        })
        cy.get(signUpSelectors.tooltipDescription)
            .invoke('show')
            .should('be.visible')
            .should('contain', tooltipMessage)

        return this;
    }

    inputBusinessName(value) {
        cy.get(signUpSelectors.businessName)
            .should('exist')
            .type(value)

        return this;
    }

    fillBusinessAddressInput(labelText, value) {
        cy.get(signUpSelectors.locationForm)
            .find('.input-label')
            .should('contain', labelText)
        cy.get('.left')
            .find(signUpSelectors.mainAddress)
            .should('be.empty')
            .click()
            .type(value)

        return this;
    }

    checkAddressField() {
        cy.get(signUpSelectors.secondAddress)
            .should('exist')
            .and('be.empty')

        return this;
    }

    fillCityNameInput(city) {
        cy.get(signUpSelectors.city).type(city)

        return this;
    }

    selectCountry(country) {
        cy.get(signUpSelectors.country).click()
        cy.get('.text').each((e1) => {
            if (e1.text() === country) {
                e1.click()
            }
        })

        return this;
    }

    selectProvince(province) {
        cy.get(signUpSelectors.province).find(signUpSelectors.dropdown).click()
        cy.get('.text').each((e1) => {
            if (e1.text() === province) {
                e1.click()
            }
        })

        return this;
    }

    selectPostalCode(postalCode) {
        cy.get(signUpSelectors.postalCode)
            .should('be.empty')
            .click()
            .type(postalCode)

        return this;
    }

    fillPhoneNumber(numberDigits) {
        cy.get(signUpSelectors.phoneNumber).type(numberDigits)

        return this;
    }

    fillPrefName(name) {
        cy.get(signUpSelectors.preferredName).type('test' + name)

        return this;
    }

    fillFirstName(firstName) {
        cy.get(signUpSelectors.firstName).type('test' + firstName)

        return this;
    }

    fillLastName(surname) {
        cy.get(signUpSelectors.lastName).type('test' + surname)

        return this;
    }

    checkHeardAboutUsInput() {
        cy.get(signUpSelectors.heardAboutUs).should('be.empty')

        return this;
    }

    logOut() {
        cy.get(signUpSelectors.navbar).click()
        cy.get(signUpSelectors.navContent)
            .should('be.visible')
            .contains('Account Setup')
            .click()
        cy.get(signUpSelectors.navHeader)
            .should('contain', 'Account Setup')
        cy.get(signUpSelectors.cardContentHeader)
            .find('h4')
            .contains(signUpTexts.accountSetupBusiness)
            .should('be.visible')
        cy.get(signUpSelectors.cardContentHeader)
            .find('h4')
            .contains(signUpTexts.accountSetupFunding)
            .should('be.visible')
        cy.get(signUpSelectors.cardContentHeader)
            .find('h4')
            .contains(signUpTexts.accountSetupDeposit)
            .should('be.visible')
        cy.get(signUpSelectors.navbar).click()
        cy.get(signUpSelectors.navSettings).click()
        cy.get(signUpSelectors.menuContainerInvoice).should('contain', 'Invoicing Software')
        cy.get(signUpSelectors.navbar).click()
        cy.get(signUpSelectors.companyName).click()
        cy.get(signUpSelectors.logOut).click()

        return this;
    }
}