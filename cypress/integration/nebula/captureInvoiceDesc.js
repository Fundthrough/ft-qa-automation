
import { Dashboard, dashboardSelectors, dashboardTexts } from "../../support/Page_Objects/dashboard/invoiceDashboard";

describe('Capture client facing description based on invoice states', () => {
    beforeEach(() => {
        cy.fixture("profile.json").then(function (user) {
          this.user = user;
        });
        cy.intercept('GET', '/invoices', {fixture: 'invoiceStates.json'}).as('invoices')
      });
    
    it('Validate client description', function () {

        const dashboard = new Dashboard()

        cy.login(this.user.username, this.user.password)
      
      dashboard
        .selectDropdown()
        .selectOption(dashboardSelectors.all, dashboardTexts.all)
        .verifyDescription()

    })
})