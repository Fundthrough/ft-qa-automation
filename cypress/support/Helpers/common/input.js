export const inputSelectors = {
    email: '#username',
    password: '#password',
    businessName: '#businessName',
    locationForm: '#locationForm',
    mainAddress: '#address',
    secondAddress: '#addressTwo',
    city: '#city',
    postalCode: '#postalCode',
    phoneNumber: '#phoneNumber',
    firstName: '#firstName',
    lastName: '#lastName',
    preferredName: '#preferredName'
}

export const invoiceLabels = ["Customer Name", "Invoice Number", "Invoice Date", "Due Date", "Payment Terms (Days)", "Invoice Total"]
export const signInLabels = ["Business Email", "Password"]

export const checkEmptyInput = (inputName) => {
    cy.get(inputName)
        .find('[value]')
        .should(($el) => {
            expect($el.text().trim()).equal('')
        })
}

export const fillInputWithValue = (inputName, value) => {
    cy.get(inputName).should('exist').type(value)
}

export const checkInputValue = (inputName, value) => {
    cy.get(inputName).should('have.value', value)
}

export const clearInputValue = (inputName) => {
    cy.get(inputName).clear()
}

export const verifyInputLabels = (labels) => {
    cy.get('.input-label').each((label, index) => {
      cy.wrap(label).should('contain.text', labels[index])
    })
}