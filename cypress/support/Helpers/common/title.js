export const verifyTitle = (title) => {
    cy.get(".normal-text").should("have.text", title)
}