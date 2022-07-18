import { clickButtonByValue } from '../../support/Helpers/common/button'
import {
    verifyNavigation,
    visit,
} from '../../support/Helpers/common/navigation'
import { CardContent, cardTexts } from '../../support/Page_Objects/yellowCard'

describe('Yellow action card', () => {
    beforeEach(() => {
        cy.fixture('profile.json').then(function (user) {
            this.user = user
        })
    })

    it('Yellow card content validations', function () {
        const cardContent = new CardContent()

        visit('/signin')
        cy.login(this.user.username, this.user.password)

        verifyNavigation('/invoices')

        cardContent
            .checkCard()
            .verifyTitle()
            .velocityTitle()
            .expressTitle(cardTexts.express)
            .verifyDesc(cardTexts.velocity, cardTexts.velocityDesc)
            .verifyDesc(cardTexts.express, cardTexts.expressDesc)
            .clickOnYellowCard()
            .verifyAmount()
            .verifyType(cardTexts.velocity, cardTexts.velocityType)
            .verifyType(cardTexts.express, cardTexts.expressType)
            .verifySubTitle(cardTexts.velocity, cardTexts.velocitySubTitle)
            .verifySubTitle(cardTexts.express, cardTexts.expressSubTitle)
            .verifyIcons()
            .verifyTexts()
            .closeIcon()

        verifyNavigation('/invoices')

        cardContent.clickOnYellowCard()

        clickButtonByValue('Close')
        verifyNavigation('/invoices')
    })

    it('Check yellow card when the limit is set', function () {
        const cardContent = new CardContent()

        cy.login(this.user.username, this.user.password)
        cy.intercept('GET', '/users', (req) => {
            req.reply({
                statusCode: 200,
                fixture: 'express.json',
            })
        }).as('prequel')

        cy.wait('@prequel')

        cardContent
            .clickOnYellowCard()
            .verifySubTitle('$10,000', cardTexts.expressSubTitle)
            .closeIcon()
            .expressTitle('$10,000')
    })
})
