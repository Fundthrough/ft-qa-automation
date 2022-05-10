export const messageSelectors = {
    error: '.error',
}

export const messageTexts = {
    emailError: 'Invalid email format',
    termsAndConditions: 'Please indicate that you have read and agree to the Terms and Conditions and Privacy Policy.',
<<<<<<< HEAD
=======
    jobTitleError: 'Invalid job title',
    businessNameError: 'Invalid business name'
>>>>>>> origin/qaft-653-legaldetails
}

export const checkErrorMessage = (message) => {
    cy.get(messageSelectors.error).should('contain', message)
}