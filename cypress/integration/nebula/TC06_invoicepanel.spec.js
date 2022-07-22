import { InvoiceDetails } from "../../support/Page_Objects/invoicePanelElements";

describe('Invoice Details Grid', () => {
    beforeEach(() => {
        cy.fixture("profile.json").then(function (user) {
            this.user = user;
          });
    })

    it('Validate Invoice Details Grid', function () {

        const invoiceDetails = new InvoiceDetails() 

        cy.login(this.user.username, this.user.password)
        
        invoiceDetails
            .verifyInvoiceDetails()
    })
})

