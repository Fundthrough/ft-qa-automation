export const iframeSelectors = {
    contractIframe: 'iframe.x-hellosign-embedded__iframe',
    plaidIframe: 'iframe#plaid-link-iframe-1'
}

export const loadingSelectors = {
    loadingSpinner: '.loading-indicator',
    shimmer: '[data-testid="shimmer-loading-pane"]',
    loadingSpinnerBank: '.LoadingSpinner-module_loader__Eiyo_',
    spin: '.LoadingPane-module__risingTide'

}

export const getIframeBody = (iframe) => {
    // get the document
    return cy
        .get(iframe)
        .its('0.contentDocument').should('exist')
        .its('body').should('not.be.undefined')
        .then(cy.wrap)
}


