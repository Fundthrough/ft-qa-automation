import {NavigationPage} from "../../support/Page_Objects/navigationPage";
import {checkHeaderText, checkParagraph} from "../../support/Helpers/common/title";
import {InvoiceUpload} from "../../support/Page_Objects/invoiceElements";
import {DocumentationPage} from "../../support/Page_Objects/documentationPage";
import {clickButtonByValue} from "../../support/Helpers/common/button";
import {checkMessage, messageSelectors} from "../../support/Helpers/common/messages";

Cypress.on('uncaught:exception', () => {
    return false;
});

describe('Documentation page in navigation section', () => {
    beforeEach(() => {
        cy.clearLocalStorage()
        cy.fixture("profile.json").then(function (user) {
            this.user = user;
        });
    })
    it('Verify documentation page', function () {
        const navigationPage = new NavigationPage();
        const invoiceUpload = new InvoiceUpload();
        const documentationPage = new DocumentationPage()

        cy.login(this.user.username, this.user.password)

        navigationPage.selectItemNavbar('Add Documentation')

        checkHeaderText('Upload documentation requested by the FundThrough team')
        checkParagraph('PDF, JPG or PNG supported, up to 25 MB each')

        documentationPage.verifyUploadFileContainer(true)

        invoiceUpload.uploadFile()

        documentationPage
            .verifyUploadFileContainer(false)
            .deleteFile()
            .verifyUploadFileContainer(true)

        invoiceUpload.uploadFile()

        documentationPage
            .fillDocumentName('Test')
            .fillDocumentType('Passport')

        clickButtonByValue('Done')

        checkMessage(messageSelectors.notificationDashboard,'Document upload.')
        checkMessage(messageSelectors.notificationDashboard, 'Document successfully submitted.')

        navigationPage.selectItemNavbar('Invoices')
    })
})
