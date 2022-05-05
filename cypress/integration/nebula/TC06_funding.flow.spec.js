import { fundingflowText } from '../../support/Page_Objects/SigninElements.js';
import SigninElements from '../../support/Page_Objects/SigninElements.js';
import 'cypress-wait-until';


describe('Invoice funding flow for new sign up', () => {

    before(() => {
        cy.visit('https://nebula-qa1.fundthrough.com/signin')
        cy.clearLocalStorage()
        cy.fixture('profile.json').then(function (user) { this.user = user; })
    })

    it('Validate the funding flow for new sign up', function test() {
        cy.login(this.user.username, this.user.password)

        // cy.intercept('client/users').as('users')
        // cy.wait('@users', { timeout: 15000 })
        cy.wait(6000)

        const signinElements = new SigninElements();
        const username = this.user.username
        let rowNum, customerName, invoiceNumber, invoiceAmount, invoiceDueDate;

        function getTableRow() {
            rowNum = signinElements.getrandomnumber()

            signinElements.fundingflow.gettablerow().eq(rowNum).within($row => {
                customerName = signinElements.fundingflow.getCustomerName()
                invoiceNumber = signinElements.fundingflow.getInvoiceNumber()
                invoiceAmount = signinElements.fundingflow.getInvoiceAmount()
                invoiceDueDate = signinElements.fundingflow.getInvoiceDueDate()
                signinElements.fundingflow.getCheckbox()
                signinElements.fundingflow.fundNow()
            })
        }

        function getPaid() {

            getTableRow()

            cy.url().should('include', '/fund')
            // cy.intercept('client/customers').as('customers')
            // cy.wait('@customers')
            cy.wait(8000)
    
            signinElements.fundingflow.verifyHeader(fundingflowText.stepOneHeader)
            signinElements.fundingflow.verifyBlueInfoText(fundingflowText.infoText)
            signinElements.fundingflow.verifyVelocityText(fundingflowText.velocityText)
            signinElements.fundingflow.verifyHeadingOne(fundingflowText.headingOne)
            signinElements.fundingflow.verifyHeadingTwo(fundingflowText.headingTwo)
            signinElements.fundingflow.verifyHeadingThree(fundingflowText.headingThree)
            signinElements.fundingflow.verifyHeadingFour(fundingflowText.headingFour)
            signinElements.fundingflow.verifyHeadingFive(fundingflowText.headingFive)
            signinElements.fundingflow.verifyFundingText(fundingflowText.fundingText)
            signinElements.fundingflow.verifyPayorName(customerName).then(payorname => {
                customerName.should(name => expect(name).to.equals(payorname))
            })
            signinElements.fundingflow.getToolTip()
            signinElements.fundingflow.verifyToolTipText(fundingflowText.tootTipText)
            signinElements.fundingflow.verifyInvoiceTotal().then(invoiceTotal => {
                invoiceAmount.should(amount => { expect(amount).to.equals(invoiceTotal) })
            })
            signinElements.customerPage.getforwardbutton().click()
            signinElements.fundingflow.verifyHeader(fundingflowText.stepTwoHeader, { timeout: 7000 })
            // signinElements.fundingflow.verifyCustomerReviewText().then(customerreviewtext => {
            //     customerName.should(name => {
            //         expect(customerreviewtext).to.equal(fundingflowText.customerTextOne+name+fundingflowText.customerTextTwo)
            //     })
            // })
            signinElements.fundingflow.verifyIntroEmailText(fundingflowText.introEmailText)
            signinElements.fundingflow.verifyVerificationtext(fundingflowText.verificationText)
            signinElements.fundingflow.verifyNoteText(fundingflowText.noteText)
            signinElements.fundingflow.verifyCustomerNoteOne(fundingflowText.customerNoteOne)
            signinElements.fundingflow.verifyCustomerNoteTwo().then(text => {
                expect(signinElements.trimText(text)).to.equals(fundingflowText.customerNoteTwo)
            })
            signinElements.customerPage.getforwardbutton().click()
            signinElements.fundingflow.verifyHeader(fundingflowText.stepThreeHeader)
            signinElements.fundingflow.verifyBlueInfoText(fundingflowText.infoText)
            signinElements.fundingflow.verifyInvoiceTotal().then(invoicePrice => {
                invoiceAmount.should(amount => {
                    expect(amount).to.equals(invoicePrice)
                })
            })
            signinElements.fundingflow.getContactName().clear()
            signinElements.fundingflow.getrandomele().click()
            signinElements.fundingflow.verifyError(fundingflowText.nameError)
            signinElements.fundingflow.getContactName().type(fundingflowText.name)
            signinElements.fundingflow.getContactEmail().clear().type(fundingflowText.invalidEmail)
            signinElements.fundingflow.getrandomele().click()
            signinElements.fundingflow.verifyError(fundingflowText.emailError)
            signinElements.fundingflow.getContactEmail().clear().type(fundingflowText.email)
            signinElements.customerPage.getforwardbutton().click({ force: true })
            signinElements.fundingflow.verifyHeader(fundingflowText.stepFourHeader)
            signinElements.fundingflow.verifyBlueInfoText(fundingflowText.infoText)
            signinElements.fundingflow.verifyInvoiceTotal().then(invoicePrice => {
                invoiceAmount.should(amount => {
                    expect(amount).to.equals(invoicePrice)
                })
            })
            signinElements.fundingflow.verifyMainText(fundingflowText.mainText)
            signinElements.fundingflow.verifyInvoiceName().then(invoiceName => {
                invoiceNumber.should(number => expect(number).to.equals(invoiceName))
            })
            signinElements.fundingflow.verifyDueDate().then(duedate => {
                invoiceDueDate.should(date => expect(date).to.equals(duedate))
            })
            signinElements.fundingflow.verifyInvoicePrice().then(invoicePrice => {
                invoiceAmount.should(amount => expect(amount).to.equals(invoicePrice))
            })
            signinElements.fundingflow.verifyContactName(fundingflowText.name)
            signinElements.fundingflow.verifyContactEmail(fundingflowText.email)
            cy.waitUntil(() => signinElements.customerPage.getforwardbutton().click())
            cy.waitUntil(() => signinElements.fundingflow.verifyHeader(fundingflowText.stepFiveHeader))
            signinElements.fundingflow.verifyBlueInfoText(fundingflowText.infoText)
            signinElements.fundingflow.getEmailText().then(text => {
                expect(signinElements.trimText(text)).to.equals(fundingflowText.emailText + username)
            })
            signinElements.customerPage.getforwardbutton().click()
            cy.url().should('include', '/invoices')
            signinElements.fundingflow.verifyStatus(rowNum, 'Reviewing')
            signinElements.fundingflow.clickOnDropdown()
            signinElements.fundingflow.getEligibleInvoiceList()
            cy.wait(8000)
            //cy.wait('@customers')
        }
        Cypress._.times(5, () => {
            getPaid()
        })
    })
})

