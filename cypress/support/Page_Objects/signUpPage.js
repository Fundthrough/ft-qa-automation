import {inputSelectors} from "../Helpers/common/input";

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
    navItems: '.nav__menu__items',
    cardContentHeader: '.card-content-left',
    menuContainerInvoice: '.menu-container',
    companyName: '.accordion__company-name',
    logOut: '.accordion__content_button',
    heardAboutUs: '#howYouHeardAboutUs',
    firstName: '#firstName',
    lastName: '#lastName',
    preferredName: '#preferredName',
    checkbox: '.checkbox',
}

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
    customerCallCheckbox: 'This is also what my customers call my business.',
}

export class SignUpPage {

    clickOnCard() {
        cy.get(signUpSelectors.signUpCard).click()

        return this
    }

    revealPassword(reveal = false) {
        cy.get(signUpSelectors.eyeIcon)
            .should('be.visible')
            .click()
            .then((Password) => {
                cy.wrap(Password).should(
                    reveal ? 'be.visible' : 'not.be.visible'
                )
            })
        cy.get(inputSelectors.password)
            .invoke('attr', 'type')
            .should('eq', 'text')

        return this
    }
 
    saveUserEmail_LS(){
        cy.get(inputSelectors.email).then(elem => {
            const emailInputValue = Cypress.$(elem).val()
            cy.writeFile('./cypress/fixtures/profile.json', {
                username: emailInputValue,
                password: '1Password',
            })
        })
        return this
    }

    checkTermsAndCond() {
        cy.get(signUpSelectors.termsAndConditions).check({ force: true })

        return this
    }

    uncheckTermsAndCond() {
        cy.get(signUpSelectors.termsAndConditions).uncheck({ force: true })

        return this
    }

    checkOnboardingDirectionUrl() {
        cy.intercept('POST', '/v1/t', {}).as('url')
        cy.wait('@url', { timeout: 60000 }).then(() => {
            cy.url().should('include', '/onboarding')
        })

        return this
    }

    checkQuickBooksHeader () {
        cy.get('.bold-text').should('contain', signUpTexts.quickBooksHeader)

        return this
    }

    checkImage() {
        cy.get(signUpSelectors.imageQuickBooks).should('be.visible')

        return this
    }

    skipQuickBooksStep() {
        cy.get(signUpSelectors.quickBooksSkip)
            .contains(signUpTexts.skipQuickBooks)
            .click()

        return this
    }

    selectCountry(country) {
        cy.get(signUpSelectors.country).click()
        cy.get('.text').each((e1) => {
            if (e1.text() === country) {
                e1.click()
            }
        })

        return this
    }

    selectProvince(province) {
        cy.get(signUpSelectors.province).find(signUpSelectors.dropdown).click()
        cy.get('.text').each((e1) => {
            if (e1.text() === province) {
                e1.click()
            }
        })

        return this
    }

    checkHeardAboutUsInput() {
        cy.get(signUpSelectors.heardAboutUs).should('be.empty')

        return this
    }

    selectItemFromNavbar(itemName) {
        cy.get(signUpSelectors.navbar).click()
        cy.get(signUpSelectors.navItems)
            .should('be.visible')
            .contains(itemName)
            .click({force: true})

        return this
    }

    logOut() {
        cy.get(signUpSelectors.navbar).click()
        cy.get(signUpSelectors.navContent)
            .should('be.visible')
            .contains('Account Setup')
            .click()
        cy.get(signUpSelectors.navHeader).should('contain', 'Account Setup')
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
        cy.get(signUpSelectors.menuContainerInvoice).should(
            'contain',
            'Invoicing Software'
        )
        cy.get(signUpSelectors.navbar).click()
        cy.get(signUpSelectors.companyName).click()
        cy.get(signUpSelectors.logOut).click()

        return this
    }

    checkHeardAboutUsInput() {
        cy.get(signUpSelectors.heardAboutUs).should('be.empty')

        return this;
    }
}
