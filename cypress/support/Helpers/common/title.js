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