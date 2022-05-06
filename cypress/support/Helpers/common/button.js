export const clickButtonByValue = (value) => {
    cy.get('button').contains(value).parent().click()
}

export const checkButtonIsDisabled = (buttonName) => {
    cy.get('button').contains(buttonName).parent().should('be.disabled')
}

export const checkButtonIsActive = (buttonName) => {
    cy.get('button').contains(buttonName).parent().should('not.be.disabled')
}