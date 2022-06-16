export const iframeSelectors = {
    contractIframe: 'iframe.x-hellosign-embedded__iframe',
    plaidIframe: 'iframe#plaid-link-iframe-1',
    plaidUsernameInput: '#aut-input-0',
    plaidPasswordInput: '#aut-input-1',
}

export const loadingSelectors = {
    loadingSpinner: '.loading-indicator',
    shimmer: '[data-testid="shimmer-loading-pane"]',
    loadingSpinnerBank: '.LoadingSpinner-module_loader__Eiyo_',
    spin: '.LoadingPane-module__risingTide',
    loaderDefault: '.loader'

}

export const getIframeBody = (iframe) => {
    return cy
        .get(iframe)
        .its('0.contentDocument').should('exist')
        .its('body').should('not.be.undefined')
        .then(cy.wrap)
}

export const waitForLoader = (loader) => {
    cy.get(loader).should('exist')
    cy.get(loader).should('not.exist')
}


