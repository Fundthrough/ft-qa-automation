export const messageSelectors = {
    error: '.error',
    agreementError: '.card__agreement__span_error',
    notificationDashboard: '.notification-container'
}

export const messageTexts = {
    emailError: 'Invalid email format',
    termsAndConditions: 'Please indicate that you have read and agree to the Terms and Conditions and Privacy Policy.',
    jobTitleError: 'Invalid job title',
    businessNameError: 'Invalid business name',
    taxYearError: 'Please enter a year between 1945 and 2022',
    phoneNumberError: 'Please enter a valid phone number',
    businessNumber: 'Invalid 9-digit Business Number',
    identificationNumber: 'Invalid 9-digit Employer Identification Number',
    invalidName: 'Invalid First Name',
    invalidSurname: 'Invalid Last Name',
    agreementCard: 'Please tick all checkboxes to Agree.',
}

export const checkMessage = (selector, message) => {
    cy.get(selector).should('contain', message)
}

export const agreementError = (message) => {
    cy.get(messageSelectors.agreementError).should('contain', message)
}

export const checkNotification = (message) => {
    cy.get(messageSelectors.notificationDashboard).contains(message).should('exist')
}