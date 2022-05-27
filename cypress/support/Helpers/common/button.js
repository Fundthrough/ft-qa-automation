export const clickButtonByValue = (value) => {
    cy.get('button').contains(value).parent().click()
}

export const checkButtonIsDisabled = (buttonName) => {
    cy.get('button').contains(buttonName).parent().should('be.disabled')
}

export const checkButtonIsActive = (buttonName) => {
    cy.get('button').contains(buttonName).parent().should('not.be.disabled')
}

export const verifyCheckbox = (checkbox, checkboxTitle, checked = false) => {
    cy.get(checkbox)
        .find('label')
        .then(radioButtons => {
            cy.wrap(radioButtons)
                .contains(checkboxTitle)
                .siblings()
                .should(checked ? 'be.checked' : 'not.be.checked')
        })
}

export const checkTheCheckbox = (checkbox, checkboxTitle) => {
    cy.get(checkbox)
        .find('label')
        .then(radioButtons => {
            cy.wrap(radioButtons)
                .contains(checkboxTitle)
                .siblings()
                .check({force: true})
        })
}