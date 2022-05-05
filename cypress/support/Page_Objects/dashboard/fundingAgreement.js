import {clickButtonByValue} from "../../Helpers/common/button";
import {signUpSelectors} from "../signUpPage";

export const fundingAgreementSelectors = {
    updateBusinessName: '#updatingBusinessName',
    businessName: '#businessName',
    updateJobTitle: '#updatingJobTitle',
    jobTitle: '#jobTitle',
    updateTaxYear: '#updateTaxyear',
    taxYear: '#firstBusinessTaxYear',
    updatePhoneNumber: '#updatePhoneNumber',
    phoneNumber: '#phoneNumber',
    updateOfficeAddress: '#officeAddress',
    officeAddress: '#address',










};

export const fundingAgreementTexts = {
    fundingAgreement: 'Review the funding agreement',
    legalInformation: 'Confirm your legal information',
    fundingTerms: 'Agree to the funding terms',
    taxAuth: 'Provide tax authorization'
};

export class FundingAgreementPage {

    selectCard(cardTitle, buttonTitle) {
        cy.get('.action-card-carousel').within(() => {
            cy.get('.ft-action-card-content-container').contains(cardTitle).should('be.visible')
            clickButtonByValue(buttonTitle)
        })

        return this;
    }

    checkProgress(section, currentStep, lastStep) {
        cy.get(signUpSelectors.stepContainer)
            .find(signUpSelectors.currentStep)
            .should('contain', `Step ${currentStep} of ${lastStep}`)
            .siblings()
            .should('have.text', section)

        return this;
    }

    verifyCardContentHeader(headerText) {
        cy.get('.card-full-content-left')
            .find('h4')
            .contains(headerText)
            .should('be.visible')

        return this;
    }

    updateField(fieldName, updateBtn, title) {
        cy.get(updateBtn).click()
        cy.get(fieldName)
            .clear()
            .type(title)
            .type('{enter}')


        return this;
    }

    typeInField(fieldName, title) {
        cy.get(fieldName)
            .clear()
            .type(title)
            .type('{enter}')


        return this;
    }
}