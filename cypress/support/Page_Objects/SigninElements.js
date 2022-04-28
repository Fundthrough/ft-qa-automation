import { should } from "chai";

export const fundingflowText = {
    infoText: 'Since this is your first time funding with this customer, your request may take up to 5 business days to arrive, pending review. Learn more',
    stepOneHeader: 'Confirm Funding Summary',
    stepTwoHeader : 'What to Expect with the Customer Review',
    stepThreeHeader : 'Introduce FundThrough',
    stepFourHeader : 'Get Your Invoice(s) Verified',
    stepFiveHeader : 'Review Next Steps',
    velocityText: `Here's how Velocity funding works:`,
    headingOne: 'Complete Setup',
    headingTwo: 'Learn About Customer Review',
    headingThree: 'Introduce FundThrough',
    headingFour: 'Get Your Invoice Verified',
    headingFive: 'Get Paid',
    fundingText : 'Requesting Funding For',
    tootTipText : `Once approved, you’ll see updated pricing here before advancing funds.`,
    introEmailText : 'Introduction email. Introduce your customer to Fundthrough and provide instructions for redirecting payment to us.',
    verificationText : 'Invoice Verification email. Ask your customer to verify your invoice. (If you use an invoicing portal, we might be able to skip sending this email.)',
    noteText : 'NOTE: These emails will not be sent until you’ve agreed to a final funding fee.',
    customerNoteOne : 'How do you review my customer?',
    customerNoteTwo : 'We will not send any communications to your customer unless we have your permission and you have agreed to the final funding fee.',
    invalidEmail : 'sallycookies@gmailcom',
    nameError : 'cannot be empty',
    emailError : 'email is invalid',
    name : 'Sally Cookies',
    email : 'sallycookies@gmail.com',
    mainText : 'Please respond to confirm that you accept the following invoices:',
    emailText : 'Updates will be sent to your email address:',
    customerTextOne : 'Since this is the first time funding invoices with ',
    comma : ',',
    customerTextTwo : ' we need to complete a customer review to proceed with the funding request.'

};

class SigninElements {

    customerPage = {
        getpostalcode: () => cy.get('#postalCode'),
        getcustomername: () => cy.get('#customerName'),
        getinvoicenumber: () => cy.get('#invoiceNumber'),
        getinvoiceDate: () => cy.get('#invoiceDate'),
        getinvoiceamount: () => cy.get('#invoiceTotal'),
        amountError: () => cy.get('.error'),
        getNetDays: () => cy.get('#netDays'),
        getbuttonuploadinvoice: () => cy.get('.forward').contains('Finish'),
        getinvoicecreated: () => cy.get('.notification-container'),
        getsuccessmessage: () => cy.get('.green-text.extra'),
        clickdropdown: () => cy.get('.active').click(),
        getupoadinvoice: () => cy.get('button.ui.primary.button.upload.circular'),
        getcardcotent: () => cy.get('.card-content-left'),
        getstartbusiness: () => cy.get('.ui.circular.button.bordered__small__dark-primary.ui.action'),
        uploadfiles: () => cy.get('.ui.primary.button.upload.circular'),
        getforwardbutton: () => cy.get('.ui.circular.button.forward'),
        getreversebutton: () => cy.get('.ui.button.reverse}'),
        getError: () => cy.get('.error'),

    }
    fundingflow = {
        gettablerow: () => 
            cy
                .get('.table__body__row'),
        getCustomerName: () => 
            cy
                .get('.invoice__customer__name').invoke('text'),
        getInvoiceNumber: () => 
            cy
                .get('.invoice__number').invoke('text'),
        getInvoiceAmount: () => 
            cy
                .get('.invoice__price')
                .invoke('text'),
        getInvoiceDueDate: () => 
            cy
                .get('.invoice__dueDate').invoke('text'),
        getCheckbox: () => 
            cy
                .get('[type="checkbox"]'),
        getPaidNow: () => 
            cy
                .get('.get_paid_now-button'),
        verifyHeader: (expectedText) =>
            cy
                .get('.fund-header')
                .should('have.text', expectedText),
        verifyBlueInfoText: (expectedText) =>
            cy
                .get('.FTMessageBox_ftMessageBox__1QEbD')
                .should('have.text', expectedText),
        verifyHeadingOne: (expectedText) =>
            cy
                .get(':nth-child(3) > div > .normal-text')
                .should('have.text', expectedText),
        verifyHeadingTwo: (expectedText) =>
            cy
                .get('[data-test=credit-title]')
                .should('have.text', expectedText),
        verifyHeadingThree: (expectedText) =>
            cy
                .get(':nth-child(5) > div > .normal-text')
                .should('have.text', expectedText),
        verifyHeadingFour: (expectedText) =>
            cy
                .get(':nth-child(6) > div > .normal-text')
                .should('have.text', expectedText),
        verifyHeadingFive: (expectedText) =>
            cy
                .get(':nth-child(7) > :nth-child(2) > .normal-text')
                .should('have.text', expectedText),
        verifyVelocityText: (expectedText) =>
            cy
                .get('[data-test=here-is-how]')
                .should('have.text', expectedText),
        getToolTip: () => 
            cy
                .get('.column > .question')
                .trigger('mouseover'),
        verifyToolTipText: (expectedText) => 
            cy
                .get('.top')
                .should('have.text', expectedText),
        verifyInvoiceTotal: () => 
            cy
                .get('.amount.bold-text.font-22')
                .invoke('text'),
        verifyFundingText: (expectedText) =>
            cy
                .get('[data-test=you-get] > .normal-text')
                .should('have.text', expectedText),
        verifyPayorName: () => 
            cy
                .get('[data-test=you-get] > .u-mt0')
                .invoke('text'),
        verifyCustomerReviewText: () => 
            cy
                .get('.u-pt > :nth-child(1) > .u-pb')
                .invoke('text'),
        verifyIntroEmailText: (expectedText) => 
            cy
                .get('.ReviewConfirmation_list__3HuUR > :nth-child(1)')
                .should('have.text', expectedText),
        verifyVerificationtext: (expectedText) => 
            cy
                .get('.ReviewConfirmation_list__3HuUR > :nth-child(2)')
                .should('have.text', expectedText),
        verifyNoteText: (expectedText) => 
            cy
                .get('.ReviewConfirmation_infoLine__1sOpn > b')
                .should('have.text', expectedText),
        verifyCustomerNoteOne: (expectedText) => 
            cy
                .get('.u-mb > :nth-child(1) > b')
                .should('have.text', expectedText),
        verifyCustomerNoteTwo: () => 
            cy
                .get(':nth-child(3) > b')
                .invoke('text'),
        getContactName: () => 
            cy
                .get('.contact-list-toInputs > .sc-gzVnrw > .ui > input'),
        verifyContactName:(expectedText) => 
            cy
                .get('.contact-list-toInputs > .sc-gzVnrw > .ui > input')
                .should('have.value', expectedText),
        getContactEmail: () => 
            cy
                .get('.contact-list-emailInputs > .sc-gzVnrw > .ui > input'),
        verifyContactEmail :(expectedText) => 
            cy
                .get('.contact-list-emailInputs > .sc-gzVnrw > .ui > input')
                .should('have.value',expectedText),
        getrandomele: () => 
            cy
                .get('.contact-list-emailHeader'),
        getError: () => 
            cy
                .get('.error')
                .invoke('text'),
        verifyMainText: (expectedText) => 
            cy
                .get('.mainBodyText')
                .should('have.text',expectedText),
        verifyInvoiceName: () => 
            cy
                .get('.review-list-number')
                .invoke('text'),
        verifyDueDate: () => 
            cy
                .get('.review-list-date')
                .invoke('text'),
        verifyInvoicePrice: () => 
            cy
                .get('.review-list-price')
                .invoke('text'),
        getEmailText: () => 
            cy
                .get('#email')
                .invoke('text'),
        getreviewingstatus: () => 
            cy
                .get('.invoice-table_body').find('.invoice__state')
    }


    usercredential = {
        getusername: () => cy.get('#username'),
        getpassword: () => cy.get('#password'),
        getskipcontainer: () => cy.get('.skip-container > .ui'),
        fieldlevelerror: () => cy.get('.error')
    }
    velocitydashboard = {
        contentbutton: () => cy.get('.accordion__content_button'),
        getnavbar: () => cy.get('.bars'),
        gettitle: () => cy.get('.title'),
        getyellowactioncard: () => cy.get('.ExpressAndVelocity_wrapper__JTgiJ'),
        getallctioncard: () => cy.get('.action-card-carousel-spacing').find('.slick-slide'),
        getactioncardupload: () => cy.get('.AddInvoiceButton_uploadButton__2Wner'),
        getinvoicecard: () => cy.get('.slick-current > :nth-child(1)')

    }
    elementsui = {
        getsignuphyperlink: () => cy.get('.signup_prompt_parent').find('p'),
        forgotpasswordlink: () => cy.get('.forgot-password'),
        cardcontent: () => cy.get('#card-page-content')
    }

    getrandomnumber() {
        var min = 0;
        var max = 5;
        return Math.floor(Math.random() * (max - min)) + min;
    }

    trimText(s) {
        return s.replace(/\s+/g, ' ').trim()
    }

    convertToLowerCase (s) {
        return s.toLowerCase().replace(/\s/g, '')
    }


    netDaysCount() {
        var netdayscount = [30, 60, 90];
        var randomnetDays = Math.floor(Math.random() * netdayscount.length);
        this.customerPage.getNetDays().type(netdayscount[randomnetDays])
    }
    getdatetoinvoicepage() {
        var today = new Date();
        var dd = String(today.getDate() - 1)
        var mm = String(today.getMonth() + 1)
        var yyyy = today.getFullYear();
        today = (yyyy + '/' + mm + '/' + dd);
        this.customerPage.getinvoiceDate().type(today).type('{enter}')
    }
    enterrandomnumber() {
        let x = Math.floor((Math.random() * 10))
        this.customerPage.getinvoiceamount().type(x)
        if (x == 0) {
            cy.get('.error').contains('Invalid Invoice Total');
        }
    }

    entercustomern(value) {
        this.customerPage.getcustomername().type(value)
    }

    enterpostalcode(value) {
        this.elements.getpostalcode().type(value)
    }
    // getnavbar()
    // {
    // return cy.get('.u-mt')
    // }
}
export default SigninElements;