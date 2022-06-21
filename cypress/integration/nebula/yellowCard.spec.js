import { clickButtonByValue } from '../../support/Helpers/common/button'
import {
    verifyNavigation,
    visit,
} from '../../support/Helpers/common/navigation'
import { cardContent, cardTexts } from '../../support/Page_Objects/yellowCard'

describe('Yellow action card', () => {
    beforeEach(() => {
        cy.fixture('profile.json').then(function (user) {
            this.user = user
        })
    })

    it('Yellow card content validations', function () {
        const cardcontent = new cardContent()

        visit('/signin')
        cy.login(this.user.username, this.user.password)

        verifyNavigation('/invoices')

        cardcontent
            .checkCard()
            .verifyTitle()
            .velocityTitle()
            .expressTitle()
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

        cardcontent.clickOnYellowCard()

        clickButtonByValue('Close')
        verifyNavigation('/invoices')
    })
})
