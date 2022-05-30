
export const invoiceTexts = {
    customerFormHeader: "Who is this invoice for?",
    invoiceFormHeader: "What's on the invoice?",
    successMessage: "Step Completed Thank you for uploading your invoice."
}

export const invoiceSelectors = {
    slide: '.slick-slide',
    uploadIcon: '.upload.icon',
    customer: '#customerName',
    number: '#invoiceNumber',
    date: '#invoiceDate',
    due: '#dueDate',
    payment: '#netDays',
    total: '#invoiceTotal',
    form: "form",
    addCustomer: ".item",
    clearCustomerName: ".clear",
    notification: ".notification__content",
    
}

let day = new Date()
let currentDate = day.getDate()

export class InvoiceUpload {

    clickActionCard(value) {
        cy.get(invoiceSelectors.slide).contains(value).click()

        return this;
    }

    uploadInvalidFile() {
        cy.get(invoiceSelectors.uploadIcon).attachFile("example.json", {subjectType: "drag-n-drop",});

        return this;
    }

    uploadFile() {
        cy.get(invoiceSelectors.uploadIcon).attachFile("testPicture.png", {subjectType: "drag-n-drop",});

        return this;
    }

    verifyFormHeaders() {
        cy.get(invoiceSelectors.form).parent().should("contain", invoiceTexts.customerFormHeader)
        cy.get(invoiceSelectors.form).find('h4').contains(invoiceTexts.invoiceFormHeader)

        return this;
    }

    addCustomerName() {
        cy.get(invoiceSelectors.addCustomer).click()

        return this;
    }

    clearCustomerName() {
        cy.get(invoiceSelectors.clearCustomerName).click()

        return this;
    }

    pickDate() {
        cy.get(invoiceSelectors.date).click()
        cy.get("table > tbody > tr").contains(currentDate).click()

        return this;
    }

    pickDueDate() {
        const tomorrow = new Date(day.setDate(day.getDate() + 7));
        const dueDate = tomorrow.getDate() 
        cy.get(invoiceSelectors.due).click()

        if(currentDate >= 24 ) {
            cy.get('.chevron.right').click()
            cy.get("table > tbody > tr").contains(dueDate).click()
        }  else {
            cy.get("table > tbody > tr").contains(dueDate).click()
        }   
        
        return this;
    }

    verifyPaymentDays() {
        cy.get(invoiceSelectors.payment).should('have.value','7')

        return this;
    }

    verifyUploadedInvoice() {
        cy.get(invoiceSelectors.notification).invoke('text').then(text => {
            expect(text).to.include(invoiceTexts.successMessage)
        })

        return this;
    }

}