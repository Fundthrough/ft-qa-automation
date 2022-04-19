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
        geterror: () => cy.get('.error'),
        getpaidbutton: () => cy.get('.get_paid_now-button'),
        getinvoicename: () => cy.get('.invoice__number'),
        getduedate: () => cy.get('.invoice__dueDate'),
        getheader: () => cy.get('.fund-header'),
        getblueinfotext: () => cy.get('.FTMessageBox_ftMessageBox__1QEbD'),
        getvelocitytext: () => cy.get('[data-test=here-is-how]'),
        gettooltip: () => cy.get('.column > .question'),
        getinvoicetotal: () => cy.get('.amount.bold-text.font-22'),
        getenteredinvoice: () => cy.get('.invoice__price'),
        getfundingtext: () => cy.get('[data-test=you-get] > .normal-text'),
        getpayorname: () => cy.get('[data-test=you-get] > .u-mt0'),
        getinvoicecustomer: () => cy.get('.invoice__customer__name'),
        getcustomerreviewtext: () => cy.get('.u-pt > :nth-child(1) > .u-pb'),
        getintroemailtext: () => cy.get('.ReviewConfirmation_list__3HuUR > :nth-child(1)'),
        getverificationtext: () => cy.get('.ReviewConfirmation_list__3HuUR > :nth-child(2)'),
        getnotetext: () => cy.get('.ReviewConfirmation_infoLine__1sOpn > b'),
        getcustomernote: () => cy.get('.u-mb > :nth-child(1) > b'),
        getcustomernote2: () => cy.get(':nth-child(3) > b'),
        getcontactname: () => cy.get('.contact-list-toInputs > .sc-gzVnrw > .ui > input'),
        getcontactemail: () => cy.get('.contact-list-emailInputs > .sc-gzVnrw > .ui > input'),
        getmainbodytext: () => cy.get('.mainBodyText'),
        getreviewinvoicename: () => cy.get('.review-list-number'),
        getreviewduedate: () => cy.get('.review-list-date'),
        getreviewprice: () => cy.get('.review-list-price'),
        getemailaddress: () => cy.get('#email'),
        getreviewingstatus: () => cy.get('.TableBodyRow_icon__3YAHS')
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