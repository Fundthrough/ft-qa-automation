export const signInLabels = ["Business Email", "Password"]

export const verifyTitle = (title) => {
    cy.get(".normal-text").should("have.text", title)
}

export const verifyInputLabels = (labels) => {
  cy.get('.input-label').each((label, index) => {
    cy.wrap(label).should('contain.text', labels[index])
  })
}


