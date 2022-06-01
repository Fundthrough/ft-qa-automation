export const clickButtonByValue = (value) => {
    cy.get('button').contains(value).should('exist').click({force: true})
    cy.get('button').contains(value).parent().click({force: true})
}

export const clickButton = (value) => {
    cy.get('button').contains(value).click({force: true})
}

export const checkButtonIsDisabled = (buttonName) => {
    cy.get('button').contains(buttonName).parent().should('be.disabled')
}

export const checkButtonIsActive = (buttonName) => {
    cy.get('button').contains(buttonName).parent().should('not.be.disabled')
}

export const clickBackButtonByValue = (value) => {
    cy.get(".left.arrow").should('not.be.disabled').contains(value).click()
}

export const clickBackButtonByUrl = (url) => {
        cy.get(".reverse").should("have.attr", "href", url).click();
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