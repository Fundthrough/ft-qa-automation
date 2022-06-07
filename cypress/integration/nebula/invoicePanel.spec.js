import { InvoiceDetails } from "../../support/Page_Objects/invoicePanelElements";

describe('Invoice Details Grid', () => {
    beforeEach(() => {
        cy.login()
    })

    it('Validate Invoice Details Grid', () => {

        const invoiceDetails = new InvoiceDetails() 

        invoiceDetails
            .verifyInvoiceDetails()
    })
})