import {signUpTexts} from "./signUpPage";

export const navigationSelectors = {
    navbar: '.bars',
    navItems: '.nav__menu__items',
    navHeader: '.flex-left > .ui',
    cardContentHeader: '.card-content-left',
    navSettings: '[href="/settings"]',
    menuContainerInvoice: '.menu-container',
    companyName: '.accordion__company-name',
    logOut: '.accordion__content_button',
};

export class NavigationPage {
    selectItemNavbar(title) {
        cy.wait(1000)
        cy.get(navigationSelectors.navbar).click()
        cy.get(navigationSelectors.navItems)
            .should('be.visible')
            .contains(title)
            .click()

        return this;
    }

    logOut() {
        cy.get(navigationSelectors.navbar).click()
        cy.get(navigationSelectors.navItems)
            .should('be.visible')
            .contains('Account Setup')
            .click()
        cy.get(navigationSelectors.navHeader)
            .should('contain', 'Account Setup')
        cy.get(navigationSelectors.cardContentHeader)
            .find('h4')
            .contains(signUpTexts.accountSetupBusiness)
            .should('be.visible')
        cy.get(navigationSelectors.cardContentHeader)
            .find('h4')
            .contains(signUpTexts.accountSetupFunding)
            .should('be.visible')
        cy.get(navigationSelectors.cardContentHeader)
            .find('h4')
            .contains(signUpTexts.accountSetupDeposit)
            .should('be.visible')
        cy.get(navigationSelectors.navbar).click()
        cy.get(navigationSelectors.navSettings).click()
        cy.get(navigationSelectors.menuContainerInvoice).should('contain', 'Invoicing Software')
        cy.get(navigationSelectors.navbar).click()
        cy.get(navigationSelectors.companyName).click()
        cy.get(navigationSelectors.logOut).click()

        return this;
    }

}