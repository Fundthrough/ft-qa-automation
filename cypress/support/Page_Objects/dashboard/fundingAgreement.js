import {clickButtonByValue} from "../../Helpers/common/button";
import {signUpSelectors} from "../registration/signUpPage";
import {DashboardBasePage} from "./dashboardBase";

export const fundingAgreementSelectors = {
    updateBusinessName: '#updatingBusinessName',
    businessName: '#businessName',
    updateJobTitle: '#updatingJobTitle',
    addJobTitle: '#addingJobTitle',
    jobTitle: '#jobTitle',
    taxYear: '#firstBusinessTaxYear',
    updateTaxYear: '#addingFirstBusinessTaxYear',
    updatePhoneNumber: '#updatePhoneNumber',
    phoneNumber: '#phoneNumber',
    updateOfficeAddress: '#officeAddress',
    officeAddress: '#address',
    addingBusinessNumber: '#addingBusinessNumber',
    businessNumber: '#businessNumber',
    updateLegalName: '#legalName'
};

export const fundingAgreementTexts = {
    fundingAgreement: 'Review the funding agreement',
    legalInformation: 'Confirm your legal information',
    fundingTerms: 'Agree to the funding terms',
    taxAuth: 'Provide tax authorization'
};

export class FundingAgreementPage extends DashboardBasePage{

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

    updateField(fieldName, Btn, title) {
        cy.get(Btn).click()
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

    clearField(fieldName) {
        cy.get(fieldName)
            .clear()

        return this;
    }

    verifyFundingTerms() {
        cy.get('.u-m').should('exist').scrollTo('bottom')

        return this;
    }
}