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