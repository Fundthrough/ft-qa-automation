import SigninElements from '../../support/Page_Objects/SigninElements.js';

describe('Invoice funding flow for new sign up', () => {

    before(() => {
        cy.visit('https://nebula-client.fundthrough.com/signin')
        cy.clearLocalStorage()
        cy.fixture('profile.json').then(function (user) { this.user = user; })

    })

    it('Validate the funding flow for new sign up', function test() {
        cy.login(this.user.username, this.user.password)
        cy.wait(8000)
        const signinElements = new SigninElements();
        const username = this.user.username
        function getPaid() {
            signinElements.fundingflow.gettablerow().each(($el, index) => {
                const $customer_name = $el.find('.invoice__customer__name').text()
                const $invoice_number = $el.find('.invoice__number').text()
                const $invoice_price = $el.find('.invoice__price').text()
                const $invoice_duedate = $el.find('.invoice__dueDate').text()
                //cy.wrap($el.find('.get_paid_now-button')).should('be.visible').click({force:true})
                signinElements.fundingflow.getpaidbutton().eq(0).click()
                    .then($el => {
                        cy.url().should('include', '/fund')
                        cy.wait(7000)
                        // cy.intercept('/client/customers').as('customers')
                        // cy.wait('@customers')
                        const info_text = 'Since this is your first time funding with this customer, your request may take up to 5 business days to arrive, pending review. Learn more'
                        signinElements.fundingflow.getheader().invoke('text').then($text => {
                            expect($text).to.equals('Confirm Funding Summary')
                        })
                        signinElements.fundingflow.getblueinfotext().invoke('text').then(text => {
                            expect(text).to.equals(info_text)
                        })
                        signinElements.fundingflow.getvelocitytext().invoke('text').then($text => {
                            expect($text).to.equals(`Here's how Velocity funding works:`)
                        })
                        signinElements.fundingflow.getheading1().invoke('text').then($text => {
                            expect($text).to.equals('Complete Setup')
                        })
                        signinElements.fundingflow.getheading2().invoke('text').then($text => {
                            expect($text).to.equals('Learn About Customer Review')
                        })
                        signinElements.fundingflow.getheading3().invoke('text').then($text => {
                            expect($text).to.equals('Introduce FundThrough')
                        })
                        signinElements.fundingflow.getheading4().invoke('text').then($text => {
                            expect($text).to.equals('Get Your Invoice Verified')
                        })
                        signinElements.fundingflow.getheading5().invoke('text').then($text => {
                            expect($text).to.equals('Get Paid')
                        })
                        signinElements.fundingflow.getfundingtext().invoke('text').then($text => {
                            expect($text).to.equals('Requesting Funding For')
                        })
                        signinElements.fundingflow.getpayorname().invoke('text').then($payor_name => {
                            expect($customer_name).to.equals($payor_name)
                        })
                        signinElements.fundingflow.gettooltip().trigger('mouseover')
                        signinElements.fundingflow.gettooltiptext().invoke('text').then($text => {
                            expect($text).to.equals(`Once approved, you’ll see updated pricing here before advancing funds.`)
                        })
                        signinElements.fundingflow.getinvoicetotal().invoke('text').then(text => {
                            expect(text).to.equals($invoice_price)
                        })
                        signinElements.customerPage.getforwardbutton().click()
                        signinElements.fundingflow.getheader().invoke('text').then($text => {
                            expect($text).to.equals('What to Expect with the Customer Review')
                        })
                        signinElements.fundingflow.getcustomerreviewtext().invoke('text').then($text => {
                            const customer_text = 'Since this is the first time funding invoices with' + ' ' + `${$customer_name}` + ',' + ' ' + 'we need to complete a customer review to proceed with the funding request.'
                            expect($text).to.equals(customer_text)
                        })
                        signinElements.fundingflow.getintroemailtext().invoke('text').then($text => {
                            expect($text).to.equals('Introduction email. Introduce your customer to Fundthrough and provide instructions for redirecting payment to us.')
                        })
                        signinElements.fundingflow.getverificationtext().invoke('text').then($text => {
                            expect($text).to.equals('Invoice Verification email. Ask your customer to verify your invoice. (If you use an invoicing portal, we might be able to skip sending this email.)')
                        })
                        signinElements.fundingflow.getnotetext().invoke('text').then($text => {
                            expect($text).to.equals('NOTE: These emails will not be sent until you’ve agreed to a final funding fee.')
                        })
                        signinElements.fundingflow.getcustomernote().invoke('text').then($text => {
                            expect($text).to.equals('How do you review my customer?')
                        })
                        signinElements.fundingflow.getcustomernote2().invoke('text').then($text => {
                            const final_text = $text.replace(/\s+/g, ' ').trim()
                            expect(final_text).to.equals('We will not send any communications to your customer unless we have your permission and you have agreed to the final funding fee.')
                        })
                        signinElements.customerPage.getforwardbutton().click()
                        signinElements.fundingflow.getheader().invoke('text').then($text => {
                            expect($text).to.equals('Introduce FundThrough')
                        })
                        signinElements.fundingflow.getblueinfotext().invoke('text').then($text => {
                            expect($text).to.equals(info_text)
                        })
                        signinElements.fundingflow.getinvoicetotal().invoke('text').then(text => {
                            expect(text).to.equals($invoice_price)
                        })
                        signinElements.fundingflow.getcontactname().clear()
                        signinElements.fundingflow.getcontactemail().clear().type('sallycookies@gmailcom')
                        cy.get('.contact-list-emailHeader').click()
                        signinElements.customerPage.geterror().eq(1).invoke('text').then($text => {
                            expect($text).to.equals('cannot be empty')
                        })
                        signinElements.customerPage.geterror().eq(3).invoke('text').then($text => {
                            expect($text).to.equals('email is invalid')
                        })
                        signinElements.fundingflow.getcontactname().type('Sally Cookies')
                        signinElements.fundingflow.getcontactemail().clear().type('sallycookies@gmail.com')
                        signinElements.customerPage.getforwardbutton().click({ force: true })
                        signinElements.fundingflow.getheader().invoke('text').then($text => {
                            expect($text).to.equals('Get Your Invoice(s) Verified')
                        })
                        signinElements.fundingflow.getblueinfotext().invoke('text').then(text => {
                            expect(text).to.equals(info_text)
                        })
                        signinElements.fundingflow.getinvoicetotal().invoke('text').then(text => {
                            expect(text).to.equals($invoice_price)
                        })
                        signinElements.fundingflow.getmainbodytext().invoke('text').then($text => {
                            expect($text).to.equals('Please respond to confirm that you accept the following invoices:')
                        })
                        signinElements.fundingflow.getreviewinvoicename().invoke('text').then($text => {
                            expect($text.replace(/\s/g, '')).to.equals($invoice_number.replace(/\s/g, ''))
                        })
                        signinElements.fundingflow.getreviewduedate().invoke('text').then($text => {
                            expect($text.toLowerCase().replace(/\s/g, '')).to.equals($invoice_duedate.toLowerCase().replace(/\s/g, ''))
                        })
                        signinElements.fundingflow.getreviewprice().invoke('text').then($text => {
                            expect($text).to.equals($invoice_price)
                        })
                        signinElements.fundingflow.getcontactname().should('have.value', 'Sally Cookies')
                        signinElements.fundingflow.getcontactemail().should('have.value', 'sallycookies@gmail.com')
                        cy.wait(6000)
                        signinElements.customerPage.getforwardbutton().click()
                        cy.wait(6000)
                        signinElements.fundingflow.getheader().invoke('text').then($text => {
                            expect($text).to.equals('Review Next Steps')
                        })
                        signinElements.fundingflow.getblueinfotext().invoke('text').then($text => {
                            expect($text).to.equals(info_text)
                        })
                        signinElements.fundingflow.getemailaddress().invoke('text').then($text => {
                            const text = $text.replace(/\s/g, '')
                            expect($text).to.equals('Updates will be sent to your email address:' + username)
                        })
                        signinElements.customerPage.getforwardbutton().click()
                        cy.url().should('include', '/invoices')
                        cy.wait(5000)
                    })
                cy.get('.invoice__state').eq(index).invoke('text').then($text => {
                    expect($text).to.equals('Reviewing')
                })
                cy.get('[role="listbox"]').click()
                cy.get('[name="eligible"]').click()
                cy.wait(8000)
            })
        }
        getPaid()
    })

})