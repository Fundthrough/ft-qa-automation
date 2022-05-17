import {signUpSelectors} from "../../Page_Objects/signUpPage";

export const tooltipTexts = {
    taxYear: 'This should be the first year for which your business filed taxes and is typically the year your business began operating. If you are a new business and have not yet filed taxes, select the year in which you began operations.',
    businessNumber: 'Your Business Number (BN) is a 9-digit number that identifies your business to the federal government. You can find it on your last CRA tax return.',
    personalAddress: 'Your personal address will be used in the agreement in the following step to identify you as the person responsible for your business.',
    identificationNumber: 'Your Employer Identification Number (EIN), FEIN, or FTIN, is a unique 9-digit number that identifies'

}


export const checkTooltip = (tooltipLabel, tooltipMessage) => {
    cy.get('.header')
        .contains(tooltipLabel)
        .within(() => {
            cy.get(signUpSelectors.tooltipIcon).trigger('mouseover')
        })
    cy.get(signUpSelectors.tooltipDescription)
        .invoke('show')
        .should('be.visible')
        .should('contain', tooltipMessage)
}








