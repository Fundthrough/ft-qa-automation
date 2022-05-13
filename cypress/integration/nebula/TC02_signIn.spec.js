//<reference types="cypress" />
import { SignInPage } from "../../support/Page_Objects/signInElements_new.js";
import { checkButtonIsActive, checkButtonIsDisabled, clickButtonByValue } from "../../support/Helpers/common/button";
import { checkErrorMessage, messageTexts } from "../../support/Helpers/common/messages";
import { randomChars } from "../../support/Helpers/common.js";

describe("Sign In Page", function test() {

  beforeEach(() => {
    cy.clearLocalStorage();
    cy.fixture("profile.json").then(function (user) {
      this.user = user;
    });

  });

  it("Sign In page format", function () {
    const signInPage = new SignInPage();

    signInPage
      .visit()
      .verifySignIn()
      .verifyImageText("0", "product-logo")
      .verifySignInText()
      .verifyImageText("1", "signin-intuit")
      .verifyImageText("2", "signin-openinvoice")
      .verifyRedirects("1", "Intuit")
      .goBack()
      .verifyRedirects("2", "OpenInvoice")
      .goBack()
      .verifyEmailLabel()
      .verifyStyling("Email")
      .verifyPasswordLabel()
      .verifyStyling("Password")
      .verifyForgotPwdPage()
      .clearEmailInput();

    checkButtonIsDisabled("Send Code");

    //Invalid email format
    signInPage
      .clearEmailInput()
      .enterEmailInput("techadmin" + randomChars(3) + "@fundthrough");

    checkButtonIsDisabled("Send Code");
    clickButtonByValue("Send Code");
    checkErrorMessage(messageTexts.emailError);

    //Incorrect email
    signInPage
      .clearEmailInput()
      .enterEmailInput("techadmin" + randomChars(4) + "@fundthrough.com");

    clickButtonByValue("Send Code");

    signInPage
      .resetEmailError();

    //Send code to the correct email address
    signInPage
      .clearEmailInput()
      .enterEmailInput(this.user.username);

    checkButtonIsActive("Send Code");
    //clickButtonByValue("Send Code");

    //To discuss and setup an email server to validate the email code

    signInPage
      .reverse()
      .verifySignIn()
      .verifySignUpPage();
  });

  it("Sign In with incorrect emails", () => {
    const signInPage = new SignInPage();

    signInPage
      .visit()
      .enterEmailInput("techadmin" + randomChars(5) + "fundthrough");

    clickButtonByValue("Sign In");
    checkErrorMessage(messageTexts.emailError);

    signInPage
      .clearEmailInput()
      .enterEmailInput("techadmin" + randomChars(3) + "@com");

    clickButtonByValue("Sign In");
    checkErrorMessage(messageTexts.emailError);

    signInPage
      .clearEmailInput()
      .enterEmailInput("techadmin" + randomChars(2) + "@fundthrough");

    clickButtonByValue("Sign In");
    checkErrorMessage(messageTexts.emailError);

    signInPage.clearEmailInput();

    clickButtonByValue("Sign In");
    checkErrorMessage(messageTexts.emailError);
  });

  it("Sign In with incorrect passwords", () => {
    const signInPage = new SignInPage();

    signInPage
      .visit()
      .enterPasswordInput(randomChars(4));

    clickButtonByValue("Sign In");
    checkErrorMessage(messageTexts.passwordError);

    signInPage
      .visit()
      .clearPasswordInput()
      .enterPasswordInput(randomChars(7));

    clickButtonByValue("Sign In");
    checkErrorMessage(messageTexts.passwordError);

    signInPage
      .clearPasswordInput()
      .enterPasswordInput("1");

    clickButtonByValue("Sign In");
    checkErrorMessage(messageTexts.passwordError);
  });

  it("Sign In with incorrect credentials", function test() {
    const signInPage = new SignInPage();
    let username = this.user.username;
    let password = this.user.password;

    signInPage
      .visit()
      .enterEmailInput("techadmin" + randomChars(4) + "@fundthrough.com")
      .enterPasswordInput(password);

    clickButtonByValue("Sign In");

    signInPage
      .authenticationError("Invalid credentials.");

    signInPage
      .clearEmailInput()
      .clearPasswordInput()
      .enterEmailInput(username)
      .enterPasswordInput(randomChars(8));

    clickButtonByValue("Sign In");

    signInPage
      .authenticationError("Incorrect username or password");

    signInPage
      .clearEmailInput()
      .clearPasswordInput()
      .enterEmailInput(username)
      .enterPasswordInput(randomChars(10));

    clickButtonByValue("Sign In");

    signInPage
      .authenticationError("Incorrect username or password");

    signInPage
      .clearEmailInput()
      .clearPasswordInput()
      .enterEmailInput("techadmin" + randomChars(4) + "@fundthrough.com")
      .enterPasswordInput(password);

    clickButtonByValue("Sign In");

    signInPage
      .authenticationError("Invalid credentials.");

    signInPage
      .clearEmailInput()
      .clearPasswordInput()
      .enterEmailInput("techadmin" + randomChars(4) + "@fundthrough.com")
      .enterPasswordInput(password);

    clickButtonByValue("Sign In");

    signInPage
      .authenticationError("Invalid credentials.");

    signInPage
      .clearEmailInput()
      .clearPasswordInput()
      .enterEmailInput(username)
      .enterPasswordInput(randomChars(9));

    clickButtonByValue("Sign In");

    signInPage
      .authenticationError("Incorrect username or password");

    signInPage
      .clearEmailInput()
      .clearPasswordInput()
      .enterEmailInput(username)
      .enterPasswordInput(randomChars(12));

    clickButtonByValue("Sign In");

    signInPage
      .authenticationError("Please reach out to support to log in");

  });

  it("Sign In with valid credentials", function test() {
    const signInPage = new SignInPage();
    let username = this.user.username;
    let password = this.user.password;

    signInPage
      .visit()
      .clearEmailInput()
      .enterEmailInput(username)
      .clearPasswordInput()
      .enterPasswordInput(password);

    clickButtonByValue("Sign In");

    signInPage.verifyLogin("/invoices");
  });
});
