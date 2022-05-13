export const signInSelectors = {
  font: ".font",
  image: ".image",
  label: ".input-label",
  forgotPwd: ".forgot-password",
  signUp: ".signup_prompt_parent > p",
  email: "[type='email']",
  button: "button",
  password: "[type='password']",
  authenticate: "[data-test=authenticator-error]",
  backbutton: ".green-text",
  content: ".content",
};

export const signInTexts = {
  title: "Sign In",
  intuit: "Sign in with Intuit",
  openInvoice: "Sign in with OpenInvoice",
  email: "Business Email",
  password: "Password",
  forgotPassword: "Forgot your password?",
  forgotPasswordUrlText: "forgot-password",
  resetPwd: "Reset your password",
  signInButton: "Sign In",
  emailText: "Email",
  signUpText: "Don't have an account?Sign Up",
  code: "Send Code",
  resetText:
    "Reset Password FailedPlease recheck your email and try again. If the issue persists reach out to support or check with the partner sign in page (eg: QuickBooks). ",
};

export class SignInPage {
  visit() {
    cy.visit("/signin");
    cy.url().should("include", "signin");

    return this;
  }

  verifySignIn() {
    cy.get(".u-p").should("be.visible");

    return this;
  }

  verifyImageText(num, name) {
    cy.get(signInSelectors.image).eq(num).should("have.attr", "src").and("contain", name);

    return this;
  }

  verifyRedirects(num, name) {
    cy.get(signInSelectors.image).eq(num).click().title().should("contain", name);

    return this;
  }

  verifySignInText() {
    cy.get(signInSelectors.font).should("have.text", signInTexts.title);

    return this;
  }

  verifyEmailLabel() {
    cy.get(signInSelectors.label).eq(0).should("contain", signInTexts.email);

    return this;
  }

  verifyPasswordLabel() {
    cy.get(signInSelectors.label).eq(1).should("contain", signInTexts.password);

    return this;
  }

  verifyStyling(name) {
    cy.get(signInSelectors.label)
      .contains(name)
      .should("have.css", "color", "rgb(17, 75, 95)")
      .and("have.css", "font-weight", "700");

    return this;
  }

  verifyForgotPwdText() {
    cy.get(signInSelectors.forgotPwd).should(
      "contain",
      signInTexts.forgotPassword
    );

    return this;
  }

  verifyForgotPwdPage() {
    cy.get(signInSelectors.forgotPwd)
      .click()
      .url()
      .should("include", signInTexts.forgotPasswordUrlText);
    cy.get(signInSelectors.font).should("contain", signInTexts.resetPwd);
    cy.get(signInSelectors.label).should("contain", signInTexts.emailText);
    cy.get(signInSelectors.button)
      .should("be.disabled")
      .and("contain", signInTexts.code);
    cy.get(signInSelectors.backbutton).should("contain", "BACK");

    return this;
  }

  resetEmailError() {
    cy.get(signInSelectors.content)
      .invoke("text")
      .then((text) => {
        expect(text).to.equal(signInTexts.resetText);
      });
  }

  goBack() {
    cy.go("back");

    return this;
  }

  reverse() {
    cy.get(".reverse").should("have.attr", "href", "/signin").click();
    cy.url().should("include", "/signin");

    return this;
  }

  verifySignUpPage() {
    cy.get(signInSelectors.signUp)
      .invoke("text")
      .then((text) => {
        expect(text).to.equals(signInTexts.signUpText);
      });
    cy.get(signInSelectors.signUp)
      .find("a")
      .should("have.attr", "href", "/signup")
      .invoke("attr", "href")
      .then((href) => cy.request(href).its("status").should("eq", 200));

    return this;
  }

  enterEmailInput(email) {
    cy.get(signInSelectors.email).should("be.visible").type(email);

    return this;
  }

  clearEmailInput() {
    cy.get(signInSelectors.email).should("be.visible").clear();

    return this;
  }

  enterPasswordInput(password) {
    cy.get(signInSelectors.password).should("be.visible").type(password);

    return this;
  }

  clearPasswordInput() {
    cy.get(signInSelectors.password).should("be.visible").clear();

    return this;
  }

  revealPassword(reveal = false) {
    cy.get(signInSelectors.eyeIcon)
      .should("be.visible")
      .click()
      .then((Password) => {
        cy.wrap(Password).should(reveal ? "be.visible" : "not.be.visible");
      });

    return this;
  }

  authenticationError(error) {
    cy.get(signInSelectors.authenticate).should("contain", error);

    return this;
  }

  verifyLogin(url) {
    cy.url().should("include", url);
  }
}
