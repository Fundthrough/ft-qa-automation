import { MailSlurp } from "mailslurp-client";

Cypress.Commands.add('login' ,(username, password) => {
    cy.get('#username').type(username)
    cy.get('#password').type(password)
    cy.get('.forward').click()
})

//create a client
const apiKey = "bf7ceb9faff386c49999791414583c5bedfa319e907243eb0f74a87125daa206";
const mailslurp = new MailSlurp({ apiKey });

//create an inbox
Cypress.Commands.add("createInbox",() => {
    return mailslurp.createInbox();
})

//wait for latest email
Cypress.Commands.add("waitForLatestEmail",(inboxId , timeout) => {
    return mailslurp.waitForLatestEmail(inboxId);
})
    
