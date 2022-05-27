export const verifyToolTip = (tooltipLabel, tooltipMessage) => {
    cy.get('.input-label')
        .contains(tooltipLabel)
        .within(() => {
            cy.get(".question").trigger('mouseover')
    })
    cy.get(".description")
        .invoke('show')
        .should('be.visible')
        .should('contain', tooltipMessage)

}