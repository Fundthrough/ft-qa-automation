import {clickButtonByValue} from "../../Helpers/common/button";

export class DashboardBasePage {
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
}