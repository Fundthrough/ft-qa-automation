import "cypress-file-upload";

import { InvoiceUpload, title } from "../../support/Page_Objects/invoiceElements";
import {
  verifyNavigation,
  visit,
} from "../../support/Helpers/common/navigation.js";
import {
  clearInputValue,
  fillInputWithValue,
  inputSelectors,
} from "../../support/Helpers/common/input.js";
import {
  clickBackButtonByValue,
  clickButtonByValue,
} from "../../support/Helpers/common/button";
import {
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


describe("Upload your first invoice", () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.fixture("profile").then(function (user) {
      this.user = user;
    });
    cy.visit("https://nebula-client.fundthrough.com/signin");
    fillInputWithValue(inputSelectors.email, "techadmin1255@fundthrough.com");
    fillInputWithValue(inputSelectors.password, "1Password");
    clickButtonByValue("Sign In");
    verifyNavigation("/invoices");
    // visit("/signin")
    // fillInputWithValue(inputSelectors.email, this.user.username)
    // fillInputWithValue(inputSelectors.password, this.user.password)
    // clickButtonByValue("Sign In")
    // verifyNavigation("/invoices")
  });

  it("Validate upload invoice", function test() {
        const invoiceUpload = new InvoiceUpload();
    
        invoiceUpload.clickActionCard("0");

        verifyHeader(headers.invoiceHeader);
        verifyFundHeader();
        clickButtonByValue("Upload Files")
        // .attachFile("example.json", {
        // subjectType: "drag-n-drop",
        // });
        checkMessage(messageSelectors.error, messageTexts.uploadInvoiceError);
        clickButtonByValue("Dashboard");
        verifyNavigation("/invoices");

//     invoiceUpload.clickActionCard("0");

//     clickButtonByValue("Upload Files")
// //     .attachFile("testPicture.png", {
// //       subjectType: "drag-n-drop",
// //     });
//    // checkMessage(messageSelectors.success, messageTexts.success);
//     verifyHeader(headers.customerFormHeader)
//     verifyHeader(headers.invoiceFormHeader)

//     invoiceUpload
//         .checkInputTitle(title.customer)
//         .checkInputTitle(title.number)
//         .checkInputTitle(title.date)
//         .checkInputTitle(title.due)
//         .checkInputTitle(title.payment)
//         .checkInputTitle(title.total)

//     clearInputValue(inputSelectors.customer)
//     invoiceUpload.clickOnForm()
//     checkMessage(messageSelectors.error, messageTexts.invalidCustomer)

//     clearInputValue(inputSelectors.number)
//     invoiceUpload.clickOnForm()
//     checkMessage(messageSelectors.error,messageTexts.invalidInvoice)

//     clearInputValue(inputSelectors.total)
//     invoiceUpload.clickOnForm()
//     checkMessage(messageSelectors.error, messageTexts.invalidTotal)

//     fillInputWithValue(inputSelectors.customer, randomLetter(8))
//     invoiceUpload.addCustomerName()
//     fillInputWithValue(inputSelectors.number, randomChars(6))
//     fillInputWithValue(inputSelectors.date,"2022-01-01")
//     checkMessage(messageSelectors.error, messageTexts.dateError)
//     fillInputWithValue(inputSelectors.date, invoiceUpload.pickDate())
//     fillInputWithValue(inputSelectors.due, invoiceUpload.pickDueDate())
//     invoiceUpload.verifyPaymentDays()
//     fillInputWithValue(inputSelectors.total, randomNum(3))
//     clickButtonByValue("Finish")
//     verifyHeader(headers.invoiceCreated)        
   // invoiceUpload.verifyInvoice(invoiceUpload.customerName())
  });
});
