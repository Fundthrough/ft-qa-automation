import SigninElements from '../../support/Page_Objects/SigninElements.js';

describe('Invoice funding flow for new sign up', () => {

    before(() => {
        cy.visit('https://nebula-client.fundthrough.com/signin')
        //cy.clearLocalStorage()
        cy.get('#username').type('asset2@fundthrough.com')
        cy.get('#password').type('1Password')
        cy.get('.ui.circular.button.forward').click()
        cy.url().should('include', '/invoices')
        //cy.fixture('businessuser').then(function (user) { this.user = user; })

    })

    it('Validate the funding flow for new sign up', () => {
        //cy.login(this.user.username, this.user.password)
        const signinElements = new SigninElements();

        function getPaid() {
            signinElements.customerPage.getenteredinvoice().invoke('text').then($invoice_amount => {
                signinElements.customerPage.getinvoicecustomer().invoke('text').then($customer_name => {
                    signinElements.customerPage.getinvoicename().invoke('text').then($invoice_name => {
                        signinElements.customerPage.getduedate().invoke('text').then($invoice_due_date => {
                            signinElements.customerPage.getpaidbutton().each($el => {
                                cy.wrap($el).click()
                                cy.url().should('include', '/fund')
                                cy.intercept('/client/customers').as('customers')
                                cy.wait('@customers')
                                const info_text = 'Since this is your first time funding with this customer, your request may take up to 5 business days to arrive, pending review. Learn more'
                                signinElements.customerPage.getheader().invoke('text').then($text => {
                                    expect($text).to.equals('Confirm Funding Summary')
                                })
                                signinElements.customerPage.getblueinfotext().invoke('text').then(text => {
                                    expect(text).to.equals(info_text)
                                })
                                signinElements.customerPage.getvelocitytext().invoke('text').then($text => {
                                    expect($text).to.equals(`Here's how Velocity funding works:`)
                                })
                                cy.get(':nth-child(3) > div > .normal-text').invoke('text').then($text => {
                                    expect($text).to.equals('Complete Setup')
                                })
                                cy.get('[data-test=credit-title]').invoke('text').then($text => {
                                    expect($text).to.equals('Learn About Customer Review')
                                })
                                cy.get(':nth-child(5) > div > .normal-text').invoke('text').then($text => {
                                    expect($text).to.equals('Introduce FundThrough')
                                })
                                cy.get(':nth-child(6) > div > .normal-text').invoke('text').then($text => {
                                    expect($text).to.equals('Get Your Invoice Verified')
                                })
                                cy.get(':nth-child(7) > :nth-child(2) > .normal-text').invoke('text').then($text => {
                                    expect($text).to.equals('Get Paid')
                                })
                                signinElements.customerPage.getfundingtext().invoke('text').then($text => {
                                    expect($text).to.equals('Requesting Funding For')
                                })
                                signinElements.customerPage.getpayorname().invoke('text').then($payor_name => {
                                    expect($customer_name).to.equals($payor_name)
                                })
                                signinElements.customerPage.gettooltip().trigger('mouseover')
                                cy.get('.top').invoke('text').then($text => {
                                    expect($text).to.equals(`Once approved, you’ll see updated pricing here before advancing funds.`)
                                })
                                signinElements.customerPage.getinvoicetotal().invoke('text').then(text => {
                                    expect(text).to.equals($invoice_amount)
                                })
                                signinElements.customerPage.getforwardbutton().click()
                                signinElements.customerPage.getheader().invoke('text').then($text => {
                                    expect($text).to.equals('What to Expect with the Customer Review')
                                })
                                signinElements.customerPage.getcustomerreviewtext().invoke('text').then($text => {
                                    const customer_text = 'Since this is the first time funding invoices with' + ' ' + `${$customer_name}` + ',' + ' ' + 'we need to complete a customer review to proceed with the funding request.'
                                    expect($text).to.equals(customer_text)
                                })
                                signinElements.customerPage.getintroemailtext().invoke('text').then($text => {
                                    expect($text).to.equals('Introduction email. Introduce your customer to Fundthrough and provide instructions for redirecting payment to us.')
                                })
                                signinElements.customerPage.getverificationtext().invoke('text').then($text => {
                                    expect($text).to.equals('Invoice Verification email. Ask your customer to verify your invoice. (If you use an invoicing portal, we might be able to skip sending this email.)')
                                })
                                signinElements.customerPage.getnotetext().invoke('text').then($text => {
                                    expect($text).to.equals('NOTE: These emails will not be sent until you’ve agreed to a final funding fee.')
                                })
                                signinElements.customerPage.getcustomernote().invoke('text').then($text => {
                                    expect($text).to.equals('How do you review my customer?')
                                })
                                signinElements.customerPage.getcustomernote2().invoke('text').then($text => {
                                    const final_text = $text.replace(/\s+/g, ' ').trim()
                                    expect(final_text).to.equals('We will not send any communications to your customer unless we have your permission and you have agreed to the final funding fee.')
                                })
                                signinElements.customerPage.getforwardbutton().click()
                                signinElements.customerPage.getheader().invoke('text').then($text => {
                                    expect($text).to.equals('Introduce FundThrough')
                                })
                                signinElements.customerPage.getblueinfotext().invoke('text').then($text => {
                                    expect($text).to.equals(info_text)
                                })
                                signinElements.customerPage.getinvoicetotal().invoke('text').then(text => {
                                    expect(text).to.equals($invoice_amount)
                                })
                                signinElements.customerPage.getcontactname().clear()
                                signinElements.customerPage.getcontactemail().clear().type('sallycookies@gmailcom')
                                cy.get('.contact-list-emailHeader').click()
                                signinElements.customerPage.geterror().eq(1).invoke('text').then($text => {
                                    expect($text).to.equals('cannot be empty')
                                })
                                signinElements.customerPage.geterror().eq(3).invoke('text').then($text => {
                                    expect($text).to.equals('email is invalid')
                                })
                                signinElements.customerPage.getcontactname().type('Sally Cookies')
                                signinElements.customerPage.getcontactemail().clear().type('sallycookies@gmail.com')
                                signinElements.customerPage.getforwardbutton().click()
                                signinElements.customerPage.getheader().invoke('text').then($text => {
                                    expect($text).to.equals('Get Your Invoice(s) Verified')
                                })
                                signinElements.customerPage.getblueinfotext().invoke('text').then(text => {
                                    expect(text).to.equals(info_text)
                                })
                                signinElements.customerPage.getinvoicetotal().invoke('text').then(text => {
                                    expect(text).to.equals($invoice_amount)
                                })
                                signinElements.customerPage.getmainbodytext().invoke('text').then($text => {
                                    expect($text).to.equals('Please respond to confirm that you accept the following invoices:')
                                })
                                signinElements.customerPage.getreviewinvoicename().invoke('text').then($text => {
                                    expect($text.replace(/\s/g,'')).to.equals($invoice_name.replace(/\s/g,''))
                                })
                                signinElements.customerPage.getreviewduedate().invoke('text').then($text => {
                                    expect($text.toLowerCase().replace(/\s/g,'')).to.equals($invoice_due_date.toLowerCase().replace(/\s/g,''))
                                })
                                signinElements.customerPage.getreviewprice().invoke('text').then($text => {
                                    expect($text).to.equals($invoice_amount)
                                })
                                signinElements.customerPage.getcontactname().should('have.value', 'Sally Cookies')
                                signinElements.customerPage.getcontactemail().should('have.value', 'sallycookies@gmail.com')
                                signinElements.customerPage.getforwardbutton().click()
                                signinElements.customerPage.getforwardbutton().click()
                                signinElements.customerPage.getheader().invoke('text').then($text => {
                                    expect($text).to.equals('Review Next Steps')
                                })
                                signinElements.customerPage.getblueinfotext().invoke('text').then($text => {
                                    expect($text).to.equals(info_text)
                                })
                                signinElements.customerPage.getemailaddress().invoke('text').then($text => {
                                    expect($text).to.equals('Updates will be sent to your email address:' + <br></br> + 'asset2@fundthrough.com')
                                })
                                signinElements.customerPage.getforwardbutton().click()
                                cy.url().should('include', '/invoices')
                            })
                        })
                    })
                })
            })
        }
        getPaid()
    })
})
