export const clickButtonByValue = (value) => {
    cy.get('button').contains(value).parent().click({ force: true })
}

export const checkButtonIsDisabled = (buttonName) => {
    cy.get('button').contains(buttonName).parent().should('be.disabled')
}

export const checkButtonIsActive = (buttonName) => {
    cy.get('button').contains(buttonName).parent().should('not.be.disabled')
}

export const clickBackButtonByValue = (value) => {
    cy.get('.left.arrow').should('not.be.disabled').contains(value).click()
}

export const clickBackButtonByUrl = (url) => {
    cy.get('.reverse').should('have.attr', 'href', url).click()
}
