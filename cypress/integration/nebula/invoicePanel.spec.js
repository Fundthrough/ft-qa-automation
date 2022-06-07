import { visit } from "../../support/Helpers/common/navigation";
import { InvoiceDetails, customerName } from "../../support/Page_Objects/invoiceDetails";

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