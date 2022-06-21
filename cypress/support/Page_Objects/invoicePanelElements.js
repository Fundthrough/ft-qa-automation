export const invoicePanelTexts = {
    value: 'Face Value',
    due: 'Due',
    eligible: 'eligible',
    reviewing: 'reviewing_client'
}
export const invoicePanelSelectors = {
    invoiceTable: '#invoice-table',
    customerName: '.invoice__customer__name',
    invoiceNumber: '.invoice__number',
    invoicePrice: '.invoice__price',
    dueDate: '.invoice__dueDate',
    invoiceState: '.invoice__state',
    panel: '.sidebar-right',
    panelHeader: '.invoiceDetailsPanel_header__JT4ML',
    panelNumber: '.invoiceDetailsPanel_invoiceNumber__1QjfX',
    panelTitles: '.invoiceDetailsPanel_generalInfoName__14C_B',
    panelDetails: '.invoiceDetailsPanel_generalInfoValue__CY-aB',
    panelState: '.invoiceDetailsPanel_stateBar__3VAWK',


}

export class InvoiceDetails {

    verifyInvoiceDetails() {
        cy
            .get('[role="listbox"]')
            .should('be.visible')
            .click()
        cy
            .wait(2000)
        cy
            .get('[name="all"]')
            .should('be.visible')
            .click()
       
        cy
            .get(invoicePanelSelectors.invoiceTable)
            .then(body => {
                if( body.find('.invoice-table_body').length > 0 ) {
                    this.invoiceDetails()
                } else {
                    cy.log("Add your first invoice to get started.")
                }
            })
    }

    invoiceDetails() {
            cy.get(invoicePanelSelectors.customerName).invoke('text').then(customerName => {
                cy.get(invoicePanelSelectors.invoiceNumber).invoke('text').then(invoiceNumber => {
                    const [invoice, number] = invoiceNumber.split("#")
                    const invoicenumber = invoice + '#' + ' ' + number
                    cy.get(invoicePanelSelectors.invoicePrice).invoke('text').then(invoicePrice => {
                        cy.get(invoicePanelSelectors.dueDate).invoke('text').then(dueDate => {
                            const [due, month, date, year] = dueDate.split(" ")
                            const duedate = month + ' ' +  date + ' ' + year
                            cy.get(invoicePanelSelectors.invoiceState).invoke('text').then(state => { 
                                cy.get(invoicePanelSelectors.customerName).click()
                                cy.get(invoicePanelSelectors.panel).should('be.visible')
                                cy.get(invoicePanelSelectors.panelHeader).should('contain.text', customerName)
                                cy.get(invoicePanelSelectors.panelNumber).should('contain.text', invoicenumber)
                                cy.get(invoicePanelSelectors.panelDetails).should('contain.text', invoicePrice)
                                cy.get(invoicePanelSelectors.panelDetails).eq(1).should('contain.text', duedate)
                                cy.get(invoicePanelSelectors.panelTitles).eq(0).should('contain.text', invoicePanelTexts.value)
                                cy.get(invoicePanelSelectors.panelTitles).eq(1).should('contain.text', invoicePanelTexts.due)
                                
                                if(state == 'Get Paid') {
                                    cy
                                        .get(invoicePanelSelectors.panelState)
                                        .should('contain.text', invoicePanelTexts.eligible)
                                        .and('have.css','text-transform','uppercase')
                                } else if(state == 'Reviewing') {
                                    cy
                                        .get(invoicePanelSelectors.panelState)
                                        .should('contain.text', invoicePanelTexts.reviewing)
                                        .and('have.css','text-transform','uppercase')
                                }
                            })
                        })
                    })
                })
            })

        return this;
    }
}