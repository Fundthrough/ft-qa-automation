
export const title = {
    customer : 'Customer Name',
    number: 'Invoice Number',
    date: 'Invoice Date',
    due: 'Due Date',
    payment: 'Payment Terms (Days)',
    total: 'Invoice Total',

}

let date = new Date()
export class InvoiceUpload {

    clickActionCard(number) {
        cy.get('.slick-slide').eq(number).click()
    }

    checkInputTitle(title) {
        cy.get('.input-label').should('have.text', title)
        return this;
    }

    addCustomerName() {
        cy.get('.item').click()
    }

    pickDate() {
        var currentDate = date.getDate()
        cy.get("table > tbody > tr").eq(currentDate).click()
    }

    pickDueDate() {
        var dueDate = date.getDate()+7
        cy.get("table > tbody > tr").eq(dueDate).click()
    }

    verifyPaymentDays() {
        cy.get('#netDays').should('have.value','7')
    }

    clickOnForm() {
        cy.get('.header').click()
    }

    customerName() {
        cy.get('#customerName').find('.text').text()
    }

    verifyInvoice(value) {
        cy.get('.header-info').should('have.text',value)
    }

}