export const headers = {
    invoiceHeader: 'Let’s add your invoice',
    invoiceCreated: 'Invoice Created',
}

export const fundHeaders = {
    invoiceFundHeader: 'Choose how you would like to add your invoice',
}

export const titleSelectors = {
    stepContainer: '#ft-card-next-gen',
    currentStep: '.fund-step',
}

export const verifyTitle = (title) => {
    cy.get('.normal-text').should('have.text', title)
}

export const verifyInputLabels = (labels) => {
  cy.get('.input-label').each((label, index) => {
    cy.wrap(label).should('contain.text', labels[index])
  })
}

export const verifyHeader = (headerName) => {
    cy.get('h1.header').should('have.text', headerName)
}

export const verifyFundHeader = (fundHeader) => {
    cy.get('h4.fund-header').should('have.text', fundHeader)
}

export const checkProgressAndHeader = (section, currentStep, lastStep) => {
    cy.get(titleSelectors.stepContainer)
        .find(titleSelectors.currentStep)
        .should('contain', `Step ${currentStep} of ${lastStep}`)
        .siblings()
        .should('have.text', section)
}

export const checkHeaderText = (text) => {
    cy.get('h4').contains(text).should('be.visible')
}

