import {clickButtonByValue} from "../../Helpers/common/button";
import {DashboardBasePage} from "./dashboardBase";

export const bankingFlowSelectors = {
    cardDetails: '.card-detail-column'
};

export const bankingFlowTexts = {
    fundingAgreement: 'Review the funding agreement',
    legalInformation: 'Confirm your legal information',
    fundingTerms: 'Agree to the funding terms',
    taxAuth: 'Provide tax authorization'
};

export class BankingFlowPage extends DashboardBasePage {

    selectBusinessBank(accountType) {
        cy.get('.link-bank').find('b').contains(accountType).parents('.left-float').siblings().then(() => {
            clickButtonByValue('Select')
            cy.get('button').contains('Select').should('not.exist')
        })

        return this;
    }
}