import {clickButtonByValue} from "../../Helpers/common/button";

export const fundingAgreementSelectors = {

};

export const fundingAgreementTexts = {

};

export class FundingAgreementPage {

    selectCard(cardTitle, buttonTitle) {
        cy.get('.action-card-carousel').within(() => {
            cy.get('.ft-action-card-content-container').contains(cardTitle).should('be.visible')
            clickButtonByValue(buttonTitle)
        })

        return this;
    }

    // 'Review the funding agreement'

}