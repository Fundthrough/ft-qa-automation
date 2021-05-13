/// <reference types="cypress" />

Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
  });

describe('Sign Up page', () => {
    it('signup', () => {



        cy.visit('https://nebula-qa1.fundthrough.com/signup/')
        cy.contains('Sign Up')

        function randomChars(length) {
            var result           = '';
            var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            var charactersLength = characters.length;
            for ( var i = 0; i < length; i++ ) {
               result += characters.charAt(Math.floor(Math.random() * charactersLength));
            }
            return result;
         }
         
         console.log(randomChars(4));

        cy.get('#username').click()
            .should('exist')            
            .type("kristina+" + randomChars(5) + "@fundthrough.com")


        cy.get('.row')
            .find('button').should('contain', 'Next')
            .click()

        cy.get('#password')
            .type('1Password')

        cy.get('[class="inline fields"]').find('[type="radio"]').then(Radiobuttons =>{
            cy.wrap(Radiobuttons)
            .first()
            .check({force: true})
            .should('be.checked')


            cy.wrap(Radiobuttons)
            .eq(1)
            .check({force: true})
            .should('be.checked')


            cy.wrap(Radiobuttons)
            .eq(2)
            .check({force: true})
            .should('be.checked')
        })
        
            
        cy.get('[type="checkbox"]').eq(0).check({force: true})
        cy.get('[type="checkbox"]').click({force: true})
        cy.get('.field').find('[class="error"]').should('contain', 'Please indicate that you have read and agree to the Terms and Conditions and Privacy Policy.')
        cy.get('[type="checkbox"]').eq(0).check({force: true})


    
        cy.get('.row').find('button').should('contain', 'Next').last().click()

        //cy.get('.u-pb').should('contain', 'If you already have a Velocity account')

        cy.wait(5000)

        
        cy.visit('https://nebula-qa1.fundthrough.com/onboarding')
        cy.get('[class="card-header-content u-pb"]').find('h4').then(value => {
            expect(value).to.have.text('Step 1 of 6Connect to your invoicing software')
        })
        
        cy.get('[class="skip-container u-mb0"]').contains("SKIP/ I DON'T USE QUICKBOOK").click()

        cy.wait(1000)
        cy.get('[class="card-header-content u-pb"]').find('h4').then(value => {
            expect(value).to.have.text('Step 2 of 6What is your business’s legal name?')
        })

        cy.get('#businessName')
        .should('exist')            
        .type("test " + randomChars(6))

        cy.get('[class="ui checked checkbox u-pt"]').find('[type="checkbox"]').should('be.checked')
        cy.get('.u-mt').click()

    })
})    

