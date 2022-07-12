export const dashboardSelectors = {
    invoiceDropdown: '.InvoiceStatusesDropdown_icon__146MF',
    all: '[name="all"]',
    tooltip: '.top',
    table: '#invoice-table',
}

export const dashboardTexts = {
    all: 'All',
    reviewingTooltip: 'Your application is being reviewed. You will receive an email upon approval to inform you of next steps.',
    pendingTooltip: 'Your invoice has been submitted for Express funding. Funds should be deposited shortly. You will then receive a transaction summary email.',
    fundedTooltip: 'Your funds have been sent to your account.',
    reviewingCustomerTooltip: 'Your customer is being reviewed. You will receive an email upon approval about next steps.',
    sentTooltip: 'Your invoice is pending approval/verification from your customer. (Please get in touch with your customer to help speed up the process).',
    verifiedTooltip: 'We have verified your invoice. It is now pending Velocity funding. You will receive a transaction summary email shortly.',
    paidTooltip: 'Your invoice has been fully repaid.',
    closedTooltip: 'Your invoice is no longer eligible for funding. Please contact your account manager for details.',
}

export class Dashboard {

    selectDropdown() {
        cy.get(dashboardSelectors.invoiceDropdown).click()

        return this;
    }

    selectOption(option, text) {
        cy.get(option).click().contains(text)

        return this;
    }

    clickOnDashboard() {
        cy.get(dashboardSelectors.table).click()

        return this;
    }

    verifyDescription() {
        cy.get('.invoice__state').each($el => {
            if($el.text() == 'Reviewing') {
                cy.wrap($el).trigger('mouseover')
                cy.get(dashboardSelectors.tooltip).invoke('text').then(text => {
                    if(text.includes('customer')) {
                        cy.get(dashboardSelectors.tooltip).contains(dashboardTexts.reviewingCustomerTooltip)
                    } else {
                        cy.get(dashboardSelectors.tooltip).contains(dashboardTexts.reviewingTooltip)
                    }
                })
                this.clickOnDashboard()
            } else if($el.text() == 'Pending') {
                cy.wrap($el).trigger('mouseover')
                cy.get(dashboardSelectors.tooltip).contains(dashboardTexts.pendingTooltip)
                this.clickOnDashboard()
            } else if($el.text() == 'Funded') {
                cy.wrap($el).trigger('mouseover')
                cy.get(dashboardSelectors.tooltip).contains(dashboardTexts.fundedTooltip)
                this.clickOnDashboard()
            } else if($el.text() == 'sent') {
                cy.wrap($el).trigger('mouseover')
                cy.get(dashboardSelectors.tooltip).contains(dashboardTexts.sentTooltip)
                this.clickOnDashboard()
            } else if($el.text == 'Verified') {
                cy.wrap($el).trigger('mouseover')
                cy.get(dashboardSelectors.tooltip).contains(dashboardTexts.verifiedTooltip)
                this.clickOnDashboard()
            } else if($el.text() == 'Paid') {
                cy.wrap($el).trigger('mouseover')
                cy.get(dashboardSelectors.tooltip).contains(dashboardTexts.paidTooltip)
                this.clickOnDashboard()
            } else if($el.text() == 'Closed') {
                cy.wrap($el).trigger('mouseover')
                cy.get(dashboardSelectors.tooltip).contains(dashboardTexts.closedTooltip)
                this.clickOnDashboard()
            }
        })

        return this;
    }
}