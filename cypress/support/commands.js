Cypress.Commands.add('login' ,(username, password) => {
    cy.visit('/signin')
    cy.get('.skip-container > .ui').click({ force: true })
    cy.get('#username').type(username)
    cy.get('#password').type(password)
    cy.get('.forward').click()
    cy.intercept('POST', '/v1/t', {}).as('userSignin')
    cy.wait('@userSignin', { timeout: 40000 })
})

const isIframeLoaded = $iframe => {
    const contentWindow = $iframe.contentWindow;

    const src = $iframe.attributes.src;
    const href = contentWindow.location.href;
    if (contentWindow.document.readyState === 'complete') {
        return href !== 'about:blank' || src === 'about:blank' || src === '';
    }

    return false;
};

/**
 * Wait for iframe to load, and call callback
 *
 * Some hints taken and adapted from:
 * https://gitlab.com/kgroat/cypress-iframe/-/blob/master/src/index.ts
 */
Cypress.Commands.add('iframe', { prevSubject: 'element' }, $iframes => new Cypress.Promise(resolve => {
    const loaded = [];

    $iframes.each((_, $iframe) => {
        loaded.push(
            new Promise(subResolve => {
                if (isIframeLoaded($iframe)) {
                    subResolve($iframe.contentDocument.body);
                } else {
                    Cypress.$($iframe).on('load.appearHere', () => {
                        if (isIframeLoaded($iframe)) {
                            subResolve($iframe.contentDocument.body);
                            Cypress.$($iframe).off('load.appearHere');
                        }
                    });
                }
            })
        );
    });

    return Promise.all(loaded).then(resolve);
}));
    
