import {signUpTexts} from "./signUpPage";

export const documentationSelectors = {
    navbar: '.bars',
    navItems: '.nav__menu__items',
    navHeader: '.flex-left > .ui',
    cardContentHeader: '.card-content-left',
    navSettings: '[href="/settings"]',
    menuContainerInvoice: '.menu-container',
    companyName: '.accordion__company-name',
    logOut: '.accordion__content_button',
};

export class DocumentationPage {
    fillDocumentName(text) {
        cy.get('.field')
            .find('label')
            .contains('Document Name')
            .should('be.visible')
            .parents('.field')
            .find('input').type(text)

        return this;
    }

    fillDocumentType(text) {
        cy.get('#code').click()
        cy.get('#code').find('.menu').contains(text).click()

        return this;
    }

    verifyUploadFileContainer(exists = false) {
        cy.get('.uploadCanvas').should(exists ? 'exist' : 'not.exist')

        return this;
    }

    deleteFile() {
        cy.get('.trash').click()

        return this;
    }


}