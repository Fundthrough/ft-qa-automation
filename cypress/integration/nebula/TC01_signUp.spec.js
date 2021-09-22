// <reference types="cypress" />
import {getAccount}  from "../../support/Page_Objects/signUpPage.js";

Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
});

describe('Sign Up page', () => {

    it('should not create new account', function () {
        cy.clearLocalStorage()
        const getaccount = new getAccount();

        //navigates to the Sign Up page, verifies it's elements and state before any input
        getaccount.pageNavigate()
        getaccount.signupVerify()
        getaccount.getUserNameEmpty()
        getaccount.verifyBtnNextDisabled().should('be.disabled')

        //input generating functions
        function randomChars(length) {
            var result = '';
            var characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
            var charactersLength = characters.length;
            for (var i = 0; i < length; i++) {
                result += characters.charAt(Math.floor(Math.random() * charactersLength));
            }
            return result;
        }

        function randomNum(length) {
            var result = '';
            var numbers = '0123456789';
            var numbersLength = numbers.length;
            for (var i = 0; i < length; i++) {
                result += numbers.charAt(Math.floor(Math.random() * numbersLength));
            }
            return result;
        }

        function randomLetter(length) {
            var result = '';
            var letters = 'abcdefghijklmnopqrstuvwxyz';
            var lettersLength = letters.length;
            for (var i = 0; i < length; i++) {
                result += letters.charAt(Math.floor(Math.random() * lettersLength));
            }
            return result;
        }


        console.log(randomChars(4));

        //Negative input on SignUp page
        getaccount.getUserInput("saksham+" + randomChars(5))
        getaccount.clickOnPage().click()
        getaccount.verifyBtnNextDisabled().should('be.disabled')
        getaccount.getErrorMsgInvalidEmail().should('contain', 'Invalid email format')
        getaccount.clearUsername().clear()

        getaccount.getUserInput("saksham+" + randomChars(5) + "@")
        getaccount.clickOnPage().click()
        getaccount.verifyBtnNextDisabled().should('be.disabled')
        getaccount.getErrorMsgInvalidEmail().should('contain', 'Invalid email format')
        getaccount.clearUsername().clear()

        getaccount.getUserInput("saksham+" + randomChars(5) + "@fundthrough")
        getaccount.clickOnPage().click()
        getaccount.verifyBtnNextDisabled().should('be.disabled')
        getaccount.getErrorMsgInvalidEmail().should('contain', 'Invalid email format')
        getaccount.clearUsername().clear()

        // getaccount.getUserInput("saksham+" + randomChars(5)+ "@fundthrough.co")
        // cy.get('.u-p').click()
        // getaccount.verifyBtnNextDisabled().should('be.disabled')
        // getaccount.getErrorMsgInvalidEmail().should('contain', 'Invalid email format')
        // getaccount.clearUsername().clear()

        //successful input to go to the next step
        getaccount.getUserInput("saksham+" + randomChars(5) + "@fundthrough.com")
        getaccount.getFirstNextBtn().should('contain', 'Next').click()

        //Make the password field visible
        getaccount.iconPassword().click()
            .then(Password => {
                cy.wrap(Password)
                    .should('be.visible')
            })

        //Negative test cases for Password Input
        getaccount.getPassInput().type(randomNum(8))
        getaccount.getRadioBtn().then(Radiobuttons => {
            cy.wrap(Radiobuttons)
                .first()
                .should('be.checked')

            cy.wrap(Radiobuttons)
                .eq(1)
                .should('not.be.checked')

            // cy.get('[type="checkbox"]').uncheck()
            cy.wrap(Radiobuttons)
                .eq(2)
                .should('be.checked')
        })

        getaccount.passwClear().clear()

        getaccount.getPassInput().type(randomNum(5))
        getaccount.getRadioBtn().then(Radiobuttons => {
            cy.wrap(Radiobuttons)
                .first()
                .should('be.checked')

            cy.wrap(Radiobuttons)
                .eq(1)
                .should('not.be.checked')


            cy.wrap(Radiobuttons)
                .eq(2)
                .should('not.be.checked')

        })

        getaccount.passwClear().clear()

        getaccount.getPassInput().type(randomLetter(8))
        getaccount.getRadioBtn().then(Radiobuttons => {
            cy.wrap(Radiobuttons)
                .first()
                .should('not.be.checked')

            cy.wrap(Radiobuttons)
                .eq(1)
                .should('be.checked')

            cy.wrap(Radiobuttons)
                .eq(2)
                .should('be.checked')
        })

        getaccount.passwClear().clear()

        getaccount.getPassInput().type(randomLetter(5))
        getaccount.getRadioBtn().then(Radiobuttons => {
            cy.wrap(Radiobuttons)
                .first()
                .should('not.be.checked')

            cy.wrap(Radiobuttons)
                .eq(1)
                .should('be.checked')

            cy.wrap(Radiobuttons)
                .eq(2)
                .should('not.be.checked')

        })
    })

    it('should create new account', function () {
        cy.clearLocalStorage()
        const getaccount = new getAccount();
//navigates to the Sign Up page, verifies it's elements and state before any input
        getaccount.pageNavigate()
        getaccount.signupVerify()
        getaccount.getUserNameEmpty()
        getaccount.verifyBtnNextDisabled().should('be.disabled')

        //input generating function
        // function randomChars(length) {
        //     var result = '';
        //     var characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
        //     var charactersLength = characters.length;
        //     for (var i = 0; i < length; i++) {
        //         result += characters.charAt(Math.floor(Math.random() * charactersLength));
        //     }

        //     return result;
        // }
        // console.log(randomChars(4));
        //const email = "kristina+" + randomChars(4) + "@fundthrough.com"

        //Verification of elements activation and Input on Sign Up page   
        getaccount.inputuseremail()
        getaccount.einputuseremail()
        getaccount.getFirstNextBtn().should('contain', 'Next').click()
        getaccount.getPassword()
        getaccount.iconPassword().click()
            .then(Password => {
                cy.wrap(Password)
                    .should('be.visible')
            })
        getaccount.iconPasswordNotVisible().click()

        getaccount.getRadioBtn().then(Radiobuttons => {
            cy.wrap(Radiobuttons)
                .first()
                .check({ force: true })
                .should('be.checked')

            cy.wrap(Radiobuttons)
                .eq(1)
                .check({ force: true })
                .should('be.checked')

            cy.wrap(Radiobuttons)
                .eq(2)
                .check({ force: true })
                .should('be.checked')
        })

        //checks and unchecks checkbox and validates error message
        getaccount.getCheckBox().eq(0).check({ force: true })
        getaccount.getCheckBox().click({ force: true })
        getaccount.getErrorMsgTermsAndCond().should('contain', 'Please indicate that you have read and agree to the Terms and Conditions and Privacy Policy.')
        getaccount.getCheckBox().eq(0).check({ force: true })
        getaccount.getFollowingNextBtn().should('contain', 'Next').click()

        //redirects to /onboarding flow
        cy.intercept('POST', '/v1/t', {}).as('url')
        cy.wait('@url', { timeout: 15000 }).then(() => {
            cy.url().should('include', '/onboarding')
        })

        //Step 1 page validation
        getaccount.getStepOneOnboard().contains('Step 1 of 6')
        getaccount.getTextOnStepOne().should('contain', 'Add your invoices from QuickBooks and start funding them in less than 24 hours.')
        getaccount.getImageOnStepOne().should('be.visible')
        getaccount.getLinkOnStepOne().contains("SKIP/ I DON'T USE QUICKBOOK").click()

        cy.intercept({ method: 'POST', url: 'https://api.segment.io/v1/p' }, { success: true }).as('search')
        cy.wait('@search', { timeout: 15000 })
        //Step 2 page validation
        getaccount.getHeaderOnboard().contains('Step 2 of 6')
        getaccount.getMouseHover()
        getaccount.getPopUpDesc().should('be.visible').should('contain', 'To get started, what is the registered name')
        getaccount.elements.getBusinessName().should('exist')
        getaccount.inputBusName()
        getaccount.getBnCheckBox().should('be.checked')
        getaccount.clickOnNextBtn().should('contain', 'Next').click()
        //redirects to Step 3 and fills in Company Address info
        cy.intercept('POST', '/v1/p', { success: true }).as('search')
        //cy.wait('@search')
        cy.wait('@search', { timeout: 15000 })
        //redirects to Step 3 and fills in Company Address info
        // cy.intercept('POST', '/v1/p', {}).as('search')
        // cy.wait('@search', {timeout: 15000})
        getaccount.getHeaderOnboard().contains("Step 3 of 6")
        getaccount.getBnAddress().should('contain', 'Business Address')
        getaccount.elements.getBusinessAddress().should('be.empty').click()
        getaccount.inputBusinessAddress('100 test street')
        getaccount.getEmptyAdrField().should('be.empty')
        getaccount.getCityName('Cary')
        getaccount.getCountry().click();
        getaccount.getDropDownValue().each((e1, index, $list) => {
            if (e1.text() == "USA") {
                e1.click()
            }
        })
        getaccount.getProvince().click()
        getaccount.getDropDownValue().each((e1, index, $list) => {
            if (e1.text() == "West Virginia") {
                e1.click()
            }
        })

        getaccount.getMouseHover()
        getaccount.getPopUpDesc().should('be.visible').should('contain', 'We use your address to verify your business. If you have multiple locations, enter where your business was registered.')
        getaccount.elements.getZipField().should('be.empty').click()
        getaccount.inputPostalCode('12345')
        getaccount.getNextBtnStepThree().click()

        
        cy.wait('@search')
        getaccount.getHeaderOnboard().contains("Step 4 of 6")
        getaccount.getPhoneNumber('6470001234')
        getaccount.getMouseHover()
        getaccount.getPopUpDesc().should('be.visible').should('contain', 'To keep you in the loop on your funding progress, please provide your business’s phone number. If it’s easier, you can provide your direct line.')
        getaccount.getNextBtnFolStep().should('contain', 'Next').click()

        cy.wait(8000)
        getaccount.getHeaderOnboard().contains("Step 5 of 6")
        getaccount.getPrefName()
        getaccount.getFirstName()
        getaccount.getLastName()
        getaccount.getMouseHoveroneOfMany().first().trigger('mouseover')
        getaccount.getPopUpDesc().should('be.visible').should('contain', 'To verify your identity, we need to know your legal name. This should match your government-issued ID. We’ll use your preferred name to communicate with you.')
        getaccount.getNextBtnFolStep().should('contain', 'Next').click()

        getaccount.getHearedAboutUsEmpty().should('be.empty')
        getaccount.getSkipBtn().contains('button', 'Skip').click()

        cy.wait(3000)
        getaccount.getNavbar().click()
        getaccount.getLeftMenu().should('be.visible')
        getaccount.getLeftHeading().should('contain', 'Account Setup').click()
        getaccount.getTopHeading().should('contain', 'Account Setup')
        getaccount.getBodyHeading().should('contain', 'Tell us about your business')
        getaccount.getNavbar().click()
        getaccount.getLeftMenuSetting().click()
        getaccount.getMenuContainer().should('contain', 'Invoicing Software')
        //cy.get('.ui > img').expect($el).to.have.text('Connect to QuickBooks')
        getaccount.getNavbar().click()
        getaccount.getLeftBottomTitle().click()
        getaccount.getSignOut().click()


    })
})