import {clickButtonByValue} from "../../Helpers/common/button";

export const bankingFlowSelectors = {
    cardDetails: '.card-detail-column'
};

export const bankingFlowTexts = {
    fundingAgreement: 'Review the funding agreement',
    legalInformation: 'Confirm your legal information',
    fundingTerms: 'Agree to the funding terms',
    taxAuth: 'Provide tax authorization'
};

export class BankingFlowPage {

    selectCard(cardTitle, buttonTitle) {
        cy.get('.action-card-carousel').within(() => {
            cy.get('.ft-action-card-content-container').contains(cardTitle).should('be.visible')
            clickButtonByValue(buttonTitle)
        })

        return this;
    }

    checkCard(cardTitle, exists = true) {
        cy.get('.action-card-carousel').within(() => {
            cy.get('.ft-action-card-content-container')
                .contains(cardTitle).should(exists ? 'exist' : 'not.exist')
        })

        return this;
    }
    // Plaid Checking
    selectBusinessBank(accountType) {
        cy.get('.link-bank').find('b').contains(accountType).parents('.left-float').siblings().then(() => {
            clickButtonByValue('Select')
            cy.get('button').contains('Select').should('not.exist')
        })

        return this;
    }
}