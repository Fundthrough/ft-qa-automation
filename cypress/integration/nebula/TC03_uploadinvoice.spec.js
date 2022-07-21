import { checkCard, invoiceSelectors, InvoiceUpload } from "../../support/Page_Objects/invoiceElements";
import {
  verifyNavigation, visit,
} from "../../support/Helpers/common/navigation";
import {
  clearInputValue,
  fillInputWithValue,
  invoiceLabels,
  verifyInputLabels
} from "../../support/Helpers/common/input";
import {
  clickButtonByValue,
} from "../../support/Helpers/common/button";
import {
  fundHeaders,
  headers,
  verifyFundHeader,
  verifyHeader,
} from "../../support/Helpers/common/title";
import {
    checkMessage,
    messageSelectors,
    messageTexts,
} from "../../support/Helpers/common/messages";
import { checkTooltip, tooltipTexts } from "../../support/Helpers/common/tooltip";
import {randomChars, randomLetter, randomNum} from "../../support/Helpers/common";
import {loadingSelectors, waitForLoader} from "../../support/Helpers/common/iframe";


describe("Upload your first invoice", () => {
  
  beforeEach(() => {
    cy.fixture("profile.json").then(function (user) {
      this.user = user;
    });
  });

  it("Validate upload invoice", function () {
      const invoiceUpload = new InvoiceUpload();

      cy.login(this.user.username, this.user.password)

      verifyNavigation("/invoices")

      cy.checkCard().then(element => {
          if(element.text().includes('Add your first invoice')) {
              cy.log("Adding invoice through `ADD YOUR FIRST INVOICE` action card")
              invoiceUpload
                .selectCard("Add your first invoice", "Add");

        verifyHeader(headers.invoiceHeader);
        verifyFundHeader(fundHeaders.invoiceFundHeader);

        invoiceUpload
          .uploadInvalidFile()

        checkMessage(messageSelectors.error, messageTexts.uploadInvoiceError);
        clickButtonByValue("Dashboard");
        verifyNavigation("/invoices");

        invoiceUpload
          .selectCard("Add your first invoice", "Add")
          .uploadFile()

        checkMessage(messageSelectors.success, messageTexts.success);

        invoiceUpload
          .verifyFormHeaders()

        verifyInputLabels(invoiceLabels)
//         checkTooltip('Invoice Number', tooltipTexts.invoiceNumber)
//         checkTooltip('Invoice Date', tooltipTexts.invoiceDate)

        //validate error of customer name field
        fillInputWithValue(invoiceSelectors.customer, randomLetter(8))

        invoiceUpload
          .addCustomerName()
          .clearCustomerName()

        checkMessage(messageSelectors.error, messageTexts.invalidCustomer)
        //enter customer name

        fillInputWithValue(invoiceSelectors.customer, 'customer_1')

        invoiceUpload
          .addCustomerName()

        //validate error of invoice number
        fillInputWithValue(invoiceSelectors.number, randomChars(6))
        clearInputValue(invoiceSelectors.number)
        checkMessage(messageSelectors.error, messageTexts.invalidNumber)
        //enter invoice number

        fillInputWithValue(invoiceSelectors.number, 'abc123')

        //validate error of date field
        fillInputWithValue(invoiceSelectors.date,"2022-01-01")
        checkMessage(messageSelectors.error, messageTexts.dateError)
        clearInputValue(invoiceSelectors.date)


        //enter invoice date
        invoiceUpload
          .pickDate()


        //validate error of due date field
        fillInputWithValue(invoiceSelectors.due, "2022-01-01")
        clearInputValue(invoiceSelectors.due)
        checkMessage(messageSelectors.error, messageTexts.invalidDueDate)

        //enter due date
        invoiceUpload 
          .pickDueDate()
          .verifyPaymentDays()

        //check error of invoice total
        fillInputWithValue(invoiceSelectors.total, randomNum(3))
        clearInputValue(invoiceSelectors.total)
        checkMessage(messageSelectors.error, messageTexts.invalidTotal)
        //enter invoice total
        fillInputWithValue(invoiceSelectors.total, randomNum(3))
        clickButtonByValue("Finish")

        invoiceUpload
          .verifyUploadedInvoice()
      
        } else {
            cy.log("Adding invoice through `ADD INVOICE` button")
            invoiceUpload
          .addInvoiceFromDashboard()
          .uploadFile()
        
        checkMessage(messageSelectors.success, messageTexts.success);
        fillInputWithValue(invoiceSelectors.customer, randomLetter(8))

        invoiceUpload
          .addCustomerName()

        fillInputWithValue(invoiceSelectors.number, randomChars(6))

        invoiceUpload
          .pickDate()
          .pickDueDate()
          .verifyPaymentDays()
        
        fillInputWithValue(invoiceSelectors.total, randomNum(3))
        clickButtonByValue("Finish")

        invoiceUpload
          .verifyUploadedInvoice()
          }
        checkMessage(messageSelectors.notificationDashboard, 'Invoice Created')
        checkMessage(messageSelectors.notificationDashboard, 'Click Fund to start Funding!')
        })

  });

    it("Validate the error message with the same invoice name", function () {
        const invoiceUpload = new InvoiceUpload();

        cy.login(this.user.username, this.user.password)

        verifyNavigation("/invoices")

        invoiceUpload
            .addInvoiceFromDashboard()

        verifyHeader(headers.invoiceHeader);
        verifyFundHeader(fundHeaders.invoiceFundHeader);

        invoiceUpload
            .uploadFile()

        checkMessage(messageSelectors.success, messageTexts.success);

        invoiceUpload
            .verifyFormHeaders()

        verifyInputLabels(invoiceLabels)
        checkTooltip(tooltipSelectors.inputLabel,'Invoice Number', tooltipTexts.invoiceNumber)
        checkTooltip(tooltipSelectors.inputLabel,'Invoice Date', tooltipTexts.invoiceDate)

        fillInputWithValue(invoiceSelectors.customer, 'customer_1')

        invoiceUpload
            .addCustomerName()

        //enter invoice number
        fillInputWithValue(invoiceSelectors.number, 'abc123')

        invoiceUpload
            .pickDate()

        //enter due date
        invoiceUpload
            .pickDueDate()
            .verifyPaymentDays()

        //enter invoice total
        fillInputWithValue(invoiceSelectors.total, randomNum(3))
        clickButtonByValue("Finish")
        checkMessage(messageSelectors.errorInvoice, 'The Invoice number entered already exists for this Customer')
    });
});
