export const messageSelectors = {
    error: '.error',
}

export const messageTexts = {
    emailError: 'Invalid email format',
    passwordError: 'Invalid password',
    termsAndConditions: 'Please indicate that you have read and agree to the Terms and Conditions and Privacy Policy.',
}

export const checkErrorMessage = (message) => {
    cy.get(messageSelectors.error).should('contain', message)
}