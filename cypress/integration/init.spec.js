describe('Cypress', () =>{
    it('is working', () => {
        expect(true).to.equal(true)
    })
})
it('visit the app', () => {
    cy.visit('/')
})