//<reference types="cypress" />
import SigninElements from '../../support/Page_Objects/SigninElements.js';
import { getAccount } from "../../support/Page_Objects/signUpPage.js";

describe('Velocity Signin Page', () => 
{
before(function() {
cy.visit('https://nebula-client.fundthrough.com/signin')
cy.clearLocalStorage()

cy.fixture('profile').then(function(user)
{this.user=user;
})

})
const signinElements = new SigninElements();

it('Visual Test on Sign In Page', function()  {
//check url
cy.url().should('include', '/signin');
//check heading
cy.get('h4').should('contain', 'Sign In')
//check label on sign page
cy.contains('.input-label', 'Business Email').should('have.css' , 'color', 'rgb(17, 75, 95)').and('have.css', 'font-weight', '700')
cy.contains('.input-label', 'Password').should('have.css' , 'color', 'rgb(17, 75, 95)').and('have.css', 'font-weight', '700')
//validate intuit sso image on signin page
cy.get('button')
.should(($button) => {
expect($button).to.have.length(1)
//validate class
const classes = $button.map((i, button) => {
return Cypress.$(button).attr('class')
})
expect(classes.get()).to.deep.eq([
'ui circular button sc-EHOje gaSqon forward',
])
//validate text 
const innerText= $button.map((i, button) => {
return Cypress.$(button).text()
}) 
expect(innerText.get()).to.deep.eq([
"Sign In", 
])
})
//validate links on signin page
signinElements.elementsui.getsignuphyperlink().children().should('have.attr' ,'href')
signinElements.elementsui.getsignuphyperlink().should(($p) => {
expect($p).to.have.length(1)
expect($p).to.contain("Don't have an account?")
expect($p).to.contain('Sign Up')
}).find('a').then(($a) => {
cy.wrap($a).click({force:true})
}) .then(() => {
cy.url().should('include', '/signup'); 
})
})
//redirect to forgot-password page and validate elements on forgot password page
it('validate elements on forgot password page', function()  {
  cy.visit('https://nebula-client.fundthrough.com/signin')
signinElements.elementsui.forgotpasswordlink().click();
cy.url().should('include', '/forgot-password');
signinElements.elementsui.cardcontent().should(($div) => {
expect($div).to.contain("Reset your password");
expect($div).to.contain("Email");
expect($div).to.contain("BACK");
}).then(($input) => {
cy.url().should('include' , '/forgot-password');

})

signinElements.usercredential.getusername().type('manpreet@fundthrough.com')
cy.get('button').click()
signinElements.elementsui.cardcontent().children().find('h4').should(($e1)=> {
expect($e1).contain("Enter the verification code we sent to your email address");
expect($e1).to.have.css('color' , 	'rgb(92, 93, 93)');
expect($e1).to.have.css('font-weight' , 	'400');
})
 })

})
Cypress.on('uncaught:exception', (err, runnable) => {
// returning false here prevents Cypress from
// failing the test
 return false
})
