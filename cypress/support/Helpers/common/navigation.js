//cypress controlled commands
export const navigateBack =  () => {
    cy.go("back")
}

export const reload = () => {
  cy.reload()
}

//custom commands
export const visit = (endPoint) => {
  cy.visit(endPoint)
}

export const verifyNavigation = (url) => {
  cy.url().should("include", url)
}

export const verifyRedirection = (number , value) => {
  cy.get(".image").eq(number).click().title().should("contain", value);
}

export const clickBackArrow = (value) => {
  cy.get(".reverse").should("have.text", value).click()
}


