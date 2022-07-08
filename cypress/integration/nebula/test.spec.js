//<reference types="cypress" />
import { SignInPage } from "../../support/Page_Objects/signInElements_new.js";
import { visit, verifyNavigation, clickBackArrow, reload } from "../../support/Helpers/common/navigation"
import { clearInputValue, fillInputWithValue, inputSelectors, verifyInputLabels, signInLabels } from "../../support/Helpers/common/input";
import { checkButtonIsActive, checkButtonIsDisabled, clickButtonByValue } from "../../support/Helpers/common/button";
import {checkMessage, messageSelectors, messageTexts} from "../../support/Helpers/common/messages";
import { randomChars } from "../../support/Helpers/common.js";
import {verifyTitle} from "../../support/Helpers/common/title";

describe("Sign In Page", function test() {

  beforeEach(() => {
    cy.fixture("profile.json").then(function (user) {
      this.user = user;
    });


  });

  

it("Sign In with valid credentials", function () {

  cy.login(this.user.username, this.user.password)
  cy.intercept('GET', '/users', (req) => {
    req.reply({
      statusCode: 200, // default
      fixture: 'express.json'
    })

    // cy.intercept('GET', '/users', (req) => {
    // req.reply({
    //   statusCode: 200, // default
    //   fixture: 'express.json'
    // })


    cy.intercept('GET', '/invoices', (req) => {
      req.reply({
        statusCode: 200, // default
        fixture: 'invoice.json'
      })
  })



  // cy.intercept('GET', '/users/ip_user', (req) => {
  //   // req.reply({
  //   //   statusCode: 200, // default
  //   //   fixture: 'ip_user.json'
  //   // })
   })

  });
});