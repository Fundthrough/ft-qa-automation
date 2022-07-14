import {signUpSelectors} from "../../Page_Objects/signUpPage";

export const tooltipSelectors = {
    inputLabel: '.input-label',
    header: '.header',
    popup: '.popup',
    tooltip: '.top'
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
    invoiceNumber: 'This number should match the number on the uploaded invoice copy',
    invoiceDate: 'This is the date on which the invoice is issued to your customer',
    reviewingTooltip: 'Your application is being reviewed. You will receive an email upon approval to inform you of next steps.',
    pendingTooltip: 'Your invoice has been submitted for Express funding. Funds should be deposited shortly. You will then receive a transaction summary email.',
    fundedTooltip: 'Your funds have been sent to your account.',
    reviewingCustomerTooltip: 'Your customer is being reviewed. You will receive an email upon approval about next steps.',
    sentTooltip: 'Your invoice is pending approval/verification from your customer. (Please get in touch with your customer to help speed up the process).',
    verifiedTooltip: 'We have verified your invoice. It is now pending Velocity funding. You will receive a transaction summary email shortly.',
    paidTooltip: 'Your invoice has been fully repaid.',
    closedTooltip: 'Your invoice is no longer eligible for funding. Please contact your account manager for details.',
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

export const checkPopup = (selector, message) => {
    cy.get(selector).contains(message).should('be.visible')
}







