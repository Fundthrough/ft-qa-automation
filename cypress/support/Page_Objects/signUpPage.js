import {inputSelectors} from "../Helpers/common/input";

export const signUpSelectors = {
    signUpPage: '.sign-up-value-flow',
    checkboxWrapper: '[class="inline fields"]',
    signUpCard: '[id="card-page-content"]',
    eyeIcon: '.icon-b-preview-16',
    termsAndConditions: '[name="termsAndConditions"]',
    stepContainer: '#ft-card-next-gen',
    currentStep: '.fund-step',
    imageQuickBooks: '.ui > img',
    quickBooksSkip: '[class="skip-container u-mb0"]',
    tooltipDescription: '.description',
    locationForm: '#locationForm',
    country: '#country',
    province: '#province',
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
    checkbox: '.checkbox'
};

export const signUpTexts = {
    oneNumber: 'have at least one number',
    oneLetter: 'have at least one letter',
    charLength: 'be 8 or more characters long',
    termsAndConditions: 'Please indicate that you have read and agree to the Terms and Conditions and Privacy Policy.',
    quickBooksHeader: 'Add your invoices from QuickBooks and start funding them in less than 24 hours.',
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

    clickOnCard() {
        cy.get(signUpSelectors.signUpCard).click()

        return this;
    }

    revealPassword(reveal = false) {
        cy.get(signUpSelectors.eyeIcon).should('be.visible').click().then(Password => {
            cy.wrap(Password)
                .should(reveal ? 'be.visible' : 'not.be.visible')
            })
        cy.get(inputSelectors.password)
            .invoke('attr', 'type')
            .should('eq', 'text')

        return this;
    }
 
    saveUserEmail_LS(){
        cy.get(inputSelectors.email).then(elem => {
            const emailInputValue = Cypress.$(elem).val()
            cy.writeFile('./cypress/fixtures/profile.json', { username: emailInputValue, password: '1Password' })
        });
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