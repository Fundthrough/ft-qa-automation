export const headers = {
    invoiceHeader: 'Let’s add your invoice',
    customerFormHeader: 'Who is this invoice for?',
    invoiceFormHeader: 'What`s on the invoice?',
    invoiceCreated: 'Invoice Created',
}

export const fundHeaders = {
    invoiceFundHeader: 'Choose how you would like to add your invoice'

}


export const verifyTitle = (title) => {
    cy.get(".normal-text").should("have.text", title)
}

export const verifyHeader = (headerName) => {
    cy.get('h1.header').should('have.text', headerName)
}

export const verifyFundHeader = () => {
    cy.get('h4.fund-header').should("have.text", fundHeaders.invoiceFundHeader )
}