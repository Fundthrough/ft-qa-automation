export const cardSelectors = {
    title: '#top-title',
    velocityTitle: '#velocity-amount',
    expressTitle: '#express-amount',
    desc: '.ExpressAndVelocity_description__3mLmX',
    wrapper: '#yellow_card_wrapper',
    modal: '.spec-modal-content',
    modalHeader: '.spec-header-title',
    message: '.message',
    amount: '.spec-amount',
    type: '.spec-factoring-type',
    subTitle: '.FactoringSection_subTitle__1EUod',
    icon: '.icon > .icons',
    benefits: '.FactoringSection_benefits__1kTV1',
    text: '.FactoringSection_layoutCardTop__Zkwtn',
    disclaimer: '.icon-c-info-secondary',
    closeIcon: '.close.icon',
}

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

export class CardContent {
    checkCard() {
        cy.get('#yellow_card_wrapper').should('exist')

        return this
    }

    verifyTitle() {
        cy.get(cardSelectors.title).should('have.text', cardTexts.title)

        return this
    }

    velocityTitle() {
        cy.get(cardSelectors.velocityTitle).should(
            'have.text',
            cardTexts.velocity
        )

        return this
    }

    expressTitle(title) {
        cy.get(cardSelectors.expressTitle).should('have.text', title)

        return this
    }

    verifyDesc(text, desc) {
        cy.get(cardSelectors.desc)
            .parent()
            .contains(text)
            .next()
            .should('have.text', desc)

        return this
    }

    clickOnYellowCard() {
        cy.get(cardSelectors.wrapper).click()

        return this
    }

    verifyModal() {
        cy.get(cardSelectors.modal).should('be.visible')

        return this
    }

    verifyModalHeader() {
        cy.get(cardSelectors.modalHeader).should('have.text', cardTexts.header)

        return this
    }

    verifyMessage() {
        cy.get(cardSelectors.message).should('have.text', cardTexts.message)

        return this
    }

    verifyAmount() {
        cy.get(cardSelectors.amount).each(($el, index) => {
            const text = $el.text()
            expect(text).to.equals(amount[index])
        })

        return this
    }

    verifyType(text, type) {
        cy.get(cardSelectors.type)
            .prev()
            .contains(text)
            .next()
            .should('have.text', type)

        return this
    }

    verifySubTitle(text, title) {
        cy.get(cardSelectors.subTitle)
            .prevUntil(cardSelectors.amount)
            .contains(text)
            .parent()
            .siblings()
            .should('have.text', title)

        return this
    }

    verifyIcons() {
        cy.get(cardSelectors.icon).should('have.css', 'background-image')

        return this
    }

    verifyTexts() {
        cy.get(cardSelectors.benefits).each(($el) => {
            const compareText = $el.siblings(cardSelectors.text).text()
            if (compareText.includes(cardTexts.velocity)) {
                expect($el.text()).to.equals(cardTexts.velocityText)
            } else if (compareText.includes(cardTexts.express)) {
                expect($el.text()).to.equals(cardTexts.expressText)
            }
        })

        return this
    }

    verifyDisclaimer() {
        cy.get(cardSelectors.disclaimer).should(
            'have.text',
            cardTexts.disclaimer
        )

        return this
    }

    verifyAllowedAmount(amount) {
        cy.get(cardSelectors.amount).contains(amount).should('exist')

        return this
    }

    closeIcon() {
        cy.get(cardSelectors.closeIcon).should('be.visible').click()

        return this
    }
}
