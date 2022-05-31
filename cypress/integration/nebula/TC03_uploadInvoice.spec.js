
import { invoiceSelectors, InvoiceUpload } from "../../support/Page_Objects/invoiceElements";
import {
  verifyNavigation,
  visit,
} from "../../support/Helpers/common/navigation.js";
import {
  clearInputValue,
  fillInputWithValue,
  inputSelectors,
  invoiceLabels,
  verifyInputLabels
} from "../../support/Helpers/common/input.js";
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
import {randomChars, randomLetter, randomNum} from "../../support/Helpers/common";
import { checkToolTip, invoiceToolTipTexts } from "../../support/Helpers/common/tooltip";


describe("Upload your first invoice", () => {
  
  beforeEach(() => {
    cy
      .clearLocalStorage();
    cy
      .fixture("profile").then(function (user) {
      this.user = user;
    });
  });

  it("Validate upload invoice", function test() {
        const invoiceUpload = new InvoiceUpload();

        visit("/signin")
        fillInputWithValue(inputSelectors.email, this.user.username)
        fillInputWithValue(inputSelectors.password, this.user.password)
        clickButtonByValue("Sign In")
        verifyNavigation("/invoices")
    
        invoiceUpload
          .clickActionCard("Add your first invoice");

        verifyHeader(headers.invoiceHeader);
        verifyFundHeader(fundHeaders.invoiceFundHeader);

        invoiceUpload
          .uploadInvalidFile()
        
        checkMessage(messageSelectors.error, messageTexts.uploadInvoiceError);
        clickButtonByValue("Dashboard");
        verifyNavigation("/invoices");

        invoiceUpload
          .clickActionCard("Add your first invoice")
          .uploadFile()

        checkMessage(messageSelectors.success, messageTexts.success);

        invoiceUpload
          .verifyFormHeaders()

        verifyInputLabels(invoiceLabels)
        checkToolTip(invoiceToolTipTexts)

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
  });
});
