
export class getAccount {

    pageNavigate() {
    cy.visit('https://nebula-client.fundthrough.com/signup/')
    }

    signupVerify() {
    cy.contains('Sign Up')
    }

    getUserNameEmpty() {
    return cy.get('#username').find('[value]').should(($el) => {
    expect($el.text().trim()).equal('')
    })
    }

    verifyBtnNextDisabled() {
    return cy.get('.row').find('[class="right aligned column"]').contains('button','Next')
                  
    }

    randomChars(length) {
    var result = '';
    var characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
    }

    getUserInput(userName, domain) {
    return cy.get('#username').type(userName, domain)
    }


    inputuseremail(){

    let email = "kristina+" + this.randomChars(4) + "@fundthrough.com"
    this.getUserInput(email)
    }
 
    einputuseremail(){
    cy.get('#username').then(elem => {
    const xyz = Cypress.$(elem).val()
    cy.log(xyz)
    cy.writeFile('./cypress/fixtures/profile.json', { username: xyz, password: 'Password1' })
    })

    }
 
    clearUsername() {
    return cy.get('#username')
    }


    getFirstNextBtn() {
    return cy.get('.row').find('button')
    
    }

    
    getPassword() {
    cy.get('#password').type('1Password')
    }


    iconPassword() {
    return cy.get('.icon-b-preview-16')

    }

    iconPasswordNotVisible() {
    return cy.get('.icon-preview-16')
    }


    getRadioBtn() {
    return cy.get('[class="inline fields"]').find('[type="radio"]')
    }


    getCheckBox() {
        return cy.get('[type="checkbox"]')
    }

    getErrorMsgTermsAndCond() {
        return cy.get('.field').find('[class="error"]')
    }


    getFollowingNextBtn() {
         return cy.get('.right > .skip-container > .ui > p')
    }


    getStepOneOnboard() {
        return cy.get('#ft-card-next-gen').find('.fund-step')
    }

    getTextOnStepOne() {
        return cy.get('.bold-text')
    }

    getImageOnStepOne(){
        return cy.get('.ui > img')
    }


    getLinkOnStepOne() {
        return cy.get('[class="skip-container u-mb0"]')
    }

    getHeaderOnboard() {
        //return cy.get('#ft-card-next-gen').find('.fund-step')
        return cy.get('.fund-step')
    }


    getMouseHover() {
        return cy.get('.question').trigger('mouseover')
    }

    getPopUpDesc() {
        return cy.get('.description').invoke('show')
        
    }


    getCountry() {
       return cy.get('#country')
    }


    getProvince() {
       return cy.get('#province').find('.dropdown')
    }


    getCityName(cityText) {
        cy.get('#city').type(cityText)
    }
    

    elements = {
       getZipField:() => cy.get('#postalCode'),
       getBusinessName:() => cy.get('#businessName'),
       getBusinessAddress:() => cy.get('.left').find('#address')
    }


    inputPostalCode(value) {
        this.elements.getZipField().type(value)
    }

    inputBusName(value) {
        this.elements.getBusinessName().type('test' + this.randomChars(4))
    }

    getBnCheckBox() {
        return cy.get('[class="ui checked checkbox u-pt"]').find('[type="checkbox"]')
    }


    getNextBtnStepThree() {
        return cy.get('#footer > :nth-child(2) > .ui')
    }


    clickOnNextBtn() {
        return cy.get('#footer').find('.u-mt')
    }


    getBnAddress() {
        return cy.get('#locationForm').find('.input-label')
    }


    inputBusinessAddress(value) {
        this.elements.getBusinessAddress().type(value)
    }

    getEmptyAdrField() {
        return cy.get('#addressTwo')
    }

    getDropDownValue() {
        return cy.get('.text')
    }


    getPhoneNumber(numberDigits) {
        cy.get('#phoneNumber').type(numberDigits)
    }


    getPrefName(Name) {
        cy.get('#preferredName').type('test' + this.randomChars(4))
    }


    getFirstName(ClientName) {
        cy.get('#firstName').type('test' + this.randomChars(4))
    }

    getLastName(Surname) {
        cy.get('#lastName').type('test' + this.randomChars(4))
    }


    getNextBtnFolStep() {
        return cy.get(':nth-child(2) > .ui > p')
    }


    getMouseHoveroneOfMany() {
        return cy.get('.question')
    }


    getHearedAboutUsEmpty() {
        return cy.get('#howYouHeardAboutUs')
    }

    getSkipBtn() {
        return cy.get('.u-mt')
    }

    getNavbar() {
        return cy.get('.bars')
    }

    getLeftMenu() {
        return cy.get('.top-padded-row > .column')
    }

    getLeftHeading() {
        return cy.get('[href="/account"] > div')
    }

    getTopHeading() {
        return cy.get('.flex-left > .ui')
    }
    
    getBodyHeading() {
        return cy.get('.u-p > div')
    }

    getLeftMenuSetting() {
        return cy.get('[href="/settings"]')
    }

    getMenuContainer() {
        return cy.get('.menu-container')
    }

    getLeftBottomTitle() {
        return cy.get('.title')
    }

    getSignOut() {
        return cy.get('.accordion__content_button')
    }
}