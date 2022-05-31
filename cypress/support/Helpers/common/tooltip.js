import {signUpSelectors} from "../../Page_Objects/signUpPage";

export const tooltipSelectors = {
    inputLabel: '.input-label',
    header: '.header'
}

export const tooltipTexts = {
    taxYear: 'This should be the first year for which your business filed taxes and is typically the year your business began operating. If you are a new business and have not yet filed taxes, select the year in which you began operations.',
    businessNumber: 'Your Business Number (BN) is a 9-digit number that identifies your business to the federal government. You can find it on your last CRA tax return.',
    personalAddress: 'Your personal address will be used in the agreement in the following step to identify you as the person responsible for your business.',
    identificationNumber: 'Your Employer Identification Number (EIN), FEIN, or FTIN, is a unique 9-digit number that identifies',
    businessLegalName: 'To get started, what is the registered name of your business? This is the name that you use on government documents and tax filings.',
    businessAddress: 'We use your address to verify your business. If you have multiple locations, enter where your business was registered.',
    contactPhone: 'To keep you in the loop on your funding progress, please provide your business’s phone number. If it’s easier, you can provide your direct line.',
    firstName: 'To verify your identity, we need to know your legal name. This should match your government-issued ID. We’ll use your preferred name to communicate with you.',
}

export const checkTooltip = (selector, tooltipLabel, tooltipMessage) => {
    cy.get(selector)
        .contains(tooltipLabel)
        .within(() => {
            cy.get(signUpSelectors.tooltipIcon).trigger('mouseover')
        })
    cy.get(signUpSelectors.tooltipDescription)
        .invoke('show')
        .should('be.visible')
        .should('contain', tooltipMessage)
}







