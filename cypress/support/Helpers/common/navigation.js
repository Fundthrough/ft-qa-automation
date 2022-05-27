//export const signInWith = ["Intuit", "OpenInvoice"]

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

// export const verifyRedirection = () => {
//   cy.get(".image").each((image, index) => {
//     cy.wrap(image).click().title().should("contain", signInWith[index])
//     cy.go("back")
//   })
// }

export const clickBackArrow = (value) => {
  cy.get(".reverse").should("have.text", value).click()
}


