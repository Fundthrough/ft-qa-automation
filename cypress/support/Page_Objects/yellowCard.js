export const cardTexts = {
    title: 'Complete setup to see if you qualify for',
    velocity: 'Unlimited',
    express: 'TBD',
    velocityDesc: 'Velocity Factoring',
    expressDesc: 'Express Financing',
    header: 'Funding You May Qualify For',
    message: 'Complete setup to claim your offer.',
    velocityType: 'velocityFactoring',
    expressType: 'expressFinancing',
    velocitySubTitle: 'Fund large invoices to your best customers.',
    expressSubTitle:
        'Get smaller invoices paid right away without involving your customer.',
    velocityText:
        'We pay you for your invoice now; your customer pays us back later.Setup in a week or less; next day payments.Fee based on payment term, typically 2.5% per 30 days.',
    expressText:
        'We advance you your amount invoice now; you pay us back over 12 weeks.Setup in as little as 24 hours; next day payments.0.5% weekly fee; repay early without penalty.',
    disclaimer: 'Release of funds subject to company review.',
}

export const amount = ['Unlimited', 'TBD']

export class cardContent {
    checkCard() {
        cy.get('#yellow_card_wrapper').should('exist')

        return this
    }

    verifyTitle() {
        cy.get('#top-title').should('have.text', cardTexts.title)

        return this
    }

    velocityTitle() {
        cy.get('#velocity-amount').should('have.text', cardTexts.velocity)

        return this
    }

    expressTitle() {
        cy.get('#express-amount').should('have.text', cardTexts.express)

        return this
    }

    verifyDesc(text, desc) {
        cy.get('.ExpressAndVelocity_description__3mLmX')
            .parent()
            .contains(text)
            .next()
            .should('have.text', desc)

        return this
    }

    clickOnYellowCard() {
        cy.get('#yellow_card_wrapper').click()

        return this
    }

    verifyModal() {
        cy.get('.spec-modal-content').should('be.visible')

        return this
    }

    verifyModalHeader() {
        cy.get('.spec-header-title').should('have.text', cardTexts.header)

        return this
    }

    verifyMessage() {
        cy.get('.message').should('have.text', cardTexts.message)

        return this
    }

    verifyAmount() {
        cy.get('.spec-amount').each(($el, index) => {
            const text = $el.text()
            expect(text).to.equals(amount[index])
        })

        return this
    }

    verifyType(text, type) {
        cy.get('.spec-factoring-type')
            .prev()
            .contains(text)
            .next()
            .should('have.text', type)

        return this
    }

    verifySubTitle(text, title) {
        cy.get('.FactoringSection_subTitle__1EUod')
            .prevUntil('.spec-amount')
            .contains(text)
            .parent()
            .siblings()
            .should('have.text', title)

        return this
    }

    verifyIcons() {
        cy.get('.icon > .icons').should('have.css', 'background-image')

        return this
    }

    verifyTexts() {
        cy.get('.FactoringSection_benefits__1kTV1').each(($el) => {
            const compareText = $el
                .siblings('.FactoringSection_layoutCardTop__Zkwtn')
                .text()
            if (compareText.includes(cardTexts.velocity)) {
                expect($el.text()).to.equals(cardTexts.velocityText)
            } else if (compareText.includes(cardTexts.express)) {
                expect($el.text()).to.equals(cardTexts.expressText)
            }
        })

        return this
    }

    verifyDisclaimer() {
        cy.get('.icon-c-info-secondary').should(
            'have.text',
            cardTexts.disclaimer
        )

        return this
    }

    closeIcon() {
        cy.get('.close.icon').should('be.visible').click()
    }
}
