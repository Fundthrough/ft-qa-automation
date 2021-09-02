import SigninElements from '../../support/Page_Objects/SigninElements.js';
import 'cypress-file-upload';

   describe('Implicit Assertions', () => {
   
   
beforeEach(() => {
   cy.visit('https://nebula-client.fundthrough.com/signin')
   cy.login('manpreet+vthlv@fundthrough.com' ,  '1Password')
   cy.clearLocalStorage()
  
   })
        
  
   it('SignIn with Valid Credential', function () {
   const signinElements = new SigninElements();
   cy.wait(6000)
    signinElements.velocitydashboard.getallctioncard().eq(0).contains('Add your first invoice')
    signinElements.velocitydashboard.getallctioncard().each(($p , index , $list) => {
    const para =$p.find('p.ft-action-card-content').text()
    //find the action card which has text 'Add your first invoice'
    if(para.includes('Add your first invoice'))
    {$p.find('button').click();}
    //const mypath = 'test.png'
    })
        signinElements.customerPage.getcardcotent().then(($element)=>{
        signinElements.customerPage.getupoadinvoice()
        .attachFile('example.json', { subjectType: 'drag-n-drop' })
        //validate error message
        cy.get('.message').then(($m) =>{
        expect($m).to.have.class('ui icon message error')
        expect($m).to.have.text('There was an error uploading the file. Please ensure the file is a .pdf, .jpg, .png, or other image file and try again.')
        expect($m).to.have.css('background-color', 'rgb(255, 232, 230)')
        }).then(($element)=>{
        cy.get('button.ui.primary.button.upload.circular')
        .attachFile('testPicture.png', { subjectType: 'drag-n-drop' })
        //file has been added
        cy.contains('testPicture.png')//this need to be fix
        signinElements.customerPage.getsuccessmessage()
        }).then(($element)=>{
        signinElements.entercustomern('customer1')
        signinElements.customerPage.clickdropdown()
        //input invoice number
        signinElements.customerPage.getinvoicenumber().type('m1')
        signinElements.getdatetoinvoicepage()
        signinElements.netDaysCount();
        //input invoice amount
        signinElements.enterrandomnumber()
        }).then(() => {
        signinElements.customerPage.getbuttonuploadinvoice().click({force:true})
        cy.wait(2000)
        })
        })
        
        signinElements.customerPage.getinvoicecreated()
        //cy.wait('@addinvoice')
        //signout
        signinElements.velocitydashboard.getnavbar().click()
        signinElements.velocitydashboard.gettitle().then(($angle) =>{
        const ls = $angle.attr('class')
        cy.wrap($angle).click().should('have.class' , 'active')
        signinElements.velocitydashboard.contentbutton().click();
        })


        cy.get('[data-index="2"] > :nth-child(1) > [tabindex="-1"] > .ft-action-card-wrapper > .white-background > .u-pt').click()
        

    
    
    })
})

Cypress.on('uncaught:exception', (err, runnable) => {
    return false
    })