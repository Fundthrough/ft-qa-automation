import { clickButtonByValue } from '../Helpers/common/button'

export const invoiceTexts = {
    customerFormHeader: 'Who is this invoice for?',
    invoiceFormHeader: "What's on the invoice?",
    successMessage: 'Invoice CreatedClick Fund to start Funding! ',
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
    form: 'form',
    addCustomer: '.item',
    clearCustomerName: '.clear',
    notification: '.notification__content',
}

let day = new Date()
let currentDate = day.getDate()

export class InvoiceUpload {
    selectCard(cardTitle, buttonTitle) {
        cy.get('.action-card-carousel').within(() => {
            cy.get('.ft-action-card-content-container')
                .contains(cardTitle)
                .should('be.visible')
            clickButtonByValue(buttonTitle)
        })

        return this
    }

    uploadInvalidFile() {
        cy.get(invoiceSelectors.uploadIcon).attachFile('example.json', {
            subjectType: 'drag-n-drop',
        })

        return this
    }

    uploadFile() {
        cy.get(invoiceSelectors.uploadIcon).attachFile('testPicture.png', {
            subjectType: 'drag-n-drop',
        })

        return this
    }

    verifyFormHeaders() {
        cy.get(invoiceSelectors.form)
            .parent()
            .should('contain', invoiceTexts.customerFormHeader)
        cy.get(invoiceSelectors.form)
            .find('h4')
            .contains(invoiceTexts.invoiceFormHeader)

        return this
    }

    addCustomerName() {
        cy.get(invoiceSelectors.addCustomer).click()

        return this
    }

    clearCustomerName() {
        cy.get(invoiceSelectors.clearCustomerName).click()

        return this
    }

    pickDate() {
        cy.get(invoiceSelectors.date).click()
        cy.get('td:not(.disabled)').each(($el) => {
            if ($el.text() == currentDate) {
                cy.wrap($el).should('exist').click()
            }
        })

        return this
    }

    pickDueDate() {
        const nextWeek = new Date(day.setDate(day.getDate() + 7))
        const dueDate = nextWeek.getDate()

        cy.get(invoiceSelectors.due).click()

        if (currentDate >= 24) {
            cy.get('.chevron.right').click()
            cy.get('td:not(.disabled)').each(($el) => {
                if ($el.text() == dueDate) {
                    cy.wrap($el).should('exist').click()
                }
            })
        } else {
            cy.get('td:not(.disabled)').each(($el) => {
                if ($el.text() == dueDate) {
                    cy.wrap($el).should('exist').click()
                }
            })
        }

        return this
    }

    verifyPaymentDays() {
        cy.get(invoiceSelectors.payment).should('have.value', '7')

        return this
    }

    verifyUploadedInvoice() {
        cy.get(invoiceSelectors.notification)
            .invoke('text')
            .then((text) => {
                expect(text).to.include(invoiceTexts.successMessage)
            })

        return this
    }
}
