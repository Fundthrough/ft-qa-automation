import { invoiceStates } from "../../Helpers/common/invoiceStates";
import { checkPopup, tooltipSelectors, tooltipTexts } from "../../Helpers/common/tooltip";

export const dashboardSelectors = {
    invoiceDropdown: '.InvoiceStatusesDropdown_icon__146MF',
    all: '[name="all"]',
    table: '#invoice-table',
}

export const dashboardTexts = {
    all: 'All',
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
            if($el.text() == invoiceStates.reviewing) {
                cy.wrap($el).trigger('mouseover')
                cy.get(tooltipSelectors.tooltip).invoke('text').then(text => {
                    if(text.includes('customer')) {
                        checkPopup(tooltipSelectors.tooltip, tooltipTexts.reviewingCustomerTooltip)
                    } else {
                        checkPopup(tooltipSelectors.tooltip, tooltipTexts.reviewingTooltip)
                    }
                })
                this.clickOnDashboard()
            } else if($el.text() == invoiceStates.pending) {
                cy.wrap($el).trigger('mouseover')
                checkPopup(tooltipSelectors.tooltip, tooltipTexts.pendingTooltip)
                this.clickOnDashboard()
            } else if($el.text() == invoiceStates.funded) {
                cy.wrap($el).trigger('mouseover')
                checkPopup(tooltipSelectors.tooltip, tooltipTexts.fundedTooltip)
                this.clickOnDashboard()
            } else if($el.text() == invoiceStates.sent) {
                cy.wrap($el).trigger('mouseover')
                checkPopup(tooltipSelectors.tooltip, tooltipTexts.sentTooltip)
                this.clickOnDashboard()
            } else if($el.text == invoiceStates.verified) {
                cy.wrap($el).trigger('mouseover')
                checkPopup(tooltipSelectors.tooltip, tooltipTexts.verifiedTooltip)
                this.clickOnDashboard()
            } else if($el.text() == invoiceStates.paid) {
                cy.wrap($el).trigger('mouseover')
                checkPopup(tooltipSelectors.tooltip, tooltipTexts.paidTooltip)
                this.clickOnDashboard()
            } else if($el.text() == invoiceStates.closed) {
                cy.wrap($el).trigger('mouseover')
                checkPopup(tooltipSelectors.tooltip, tooltipTexts.closedTooltip)
                this.clickOnDashboard()
            }
        })

        return this;
    }
}