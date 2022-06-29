import {invoiceSelectors, InvoiceUpload} from "../../support/Page_Objects/invoiceElements";
import {
  verifyNavigation
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
import {checkTooltip, tooltipSelectors, tooltipTexts} from "../../support/Helpers/common/tooltip";
import {randomChars, randomLetter, randomNum} from "../../support/Helpers/common";


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

        cy.wait(3000)

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
        checkTooltip(tooltipSelectors.inputLabel, 'Invoice Number', tooltipTexts.invoiceNumber)
        checkTooltip(tooltipSelectors.inputLabel, 'Invoice Date', tooltipTexts.invoiceDate)

        //validate error of customer name field
        fillInputWithValue(invoiceSelectors.customer, randomLetter(8))

        invoiceUpload
          .addCustomerName()
          .clearCustomerName()

        checkMessage(messageSelectors.error, messageTexts.invalidCustomer)
        //enter customer name
        fillInputWithValue(invoiceSelectors.customer, randomLetter(8))

        invoiceUpload
          .addCustomerName()

        //validate error of invoice number
        fillInputWithValue(invoiceSelectors.number, randomChars(6))
        clearInputValue(invoiceSelectors.number)
        checkMessage(messageSelectors.error, messageTexts.invalidNumber)
        //enter invoice number
        fillInputWithValue(invoiceSelectors.number, randomChars(6))
        //validate error of date field
        
        //checkMessage(messageSelectors.error, messageTexts.dateError)
        //clearInputValue(invoiceSelectors.date)
//         cy.get('#invoiceDate').click()
//         fillInputWithValue(invoiceSelectors.date,"2022-01-01")
        //enter invoice datet
//      cy.get('#dueDate').click();
            
             cy.get('#invoiceDate').click().type("2022-05-01")
        // fillInputWithValue(invoiceSelectors.date,"2022-01-01")
        //enter invoice datet
     cy.get('#dueDate').click().type("2022-07-01")
        
        //validate error of due date field
        //fillInputWithValue(invoiceSelectors.due, "2022-05-01")
        // clearInputValue(invoiceSelectors.due)
        // checkMessage(messageSelectors.error, messageTexts.invalidDueDate)
      
        //enter due date
        // invoiceUpload.pickDate()
         
          //verifyPaymentDays()
        
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
          .addInvoiceUsingAddButton()
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
        })
  })
})
