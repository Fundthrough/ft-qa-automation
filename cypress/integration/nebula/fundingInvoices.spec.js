import { navigateBack } from '../../support/Helpers/common/navigation'

describe('API Mocks', () => {
    beforeEach(() => {
        cy.fixture('profile.json').then(function (user) {
            this.user = user
        })
    })

    it('Save the response in fixtures file', function () {
        cy.login(this.user.username, this.user.password)
        cy.get('.invoice__menu_button > .ui').click()
        // cy.request( {
        //     method: 'POST',
        //     url: '/client/invoices/estimate_funding',
        //     failOnStatusCode: false
        // }).then(resp => {
        //     cy.log(JSON.stringify(resp))
        //     cy.writeFile('cypress/fixtures/pricing.json',resp.body)
        // })
        cy.intercept('POST', '/estimate_funding', (req) => {
            cy.log('here')
            req.reply((resp) => {
                cy.log('Saved file to', 'pricing.json')
                cy.writeFile('cypress/fixtures/pricing.json', resp.body)
            })
        })

        navigateBack()
    })

    it.only('Mock the endpoint from fixtures file', function () {
        cy.login(this.user.username, this.user.password)

        // cy.intercept('POST', '/estimate_funding', (req) => {
        //     req.reply({
        //         fixtures: 'pricing.json'
        //     })
        // }).as('pricing')

        cy.fixture('pricing.json').then((estimates) => {
            cy.log(estimates)
            ;(estimates.estimated_invoices[0].fees_and_rates.transaction_fee = 0),
                (estimates.estimated_invoices[0].fees_and_rates.funding_fee = 0.0204082),
                (estimates.estimated_invoices[0].fees_and_rates.funding_fee = 85)

            cy.intercept('POST', '/estimate_funding', (req) => {
                req.reply({
                    fixtures: 'pricing.json',
                })
            }).as('pricing')
        })

        cy.get('.invoice__menu_button > .ui').click()
        cy.wait('@pricing').then((resp) => {
            cy.log(resp)
        })
    })
})
