export const signInLabels = ["Business Email", "Password"]

export const verifyTitle = (title) => {
    cy.get(".normal-text").should("have.text", title)
}

export const verifyInputLabels = (labels) => {
  cy.get('.input-label').each((label, index) => {
    cy.wrap(label).should('contain.text', labels[index])
  })
}




export const titleSelectors = {
    stepContainer: '#ft-card-next-gen',
    currentStep: '.fund-step',
}

export const checkProgressAndHeader = (section, currentStep, lastStep) => {
    cy.get(titleSelectors.stepContainer)
        .find(titleSelectors.currentStep)
        .should('contain', `Step ${currentStep} of ${lastStep}`)
        .siblings()
        .should('have.text', section)
}
