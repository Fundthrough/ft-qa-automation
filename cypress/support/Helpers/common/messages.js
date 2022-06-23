export const messageSelectors = {
    error: '.error',
    agreementError: '.card__agreement__span_error',
    notificationDashboard: '.notification-container',
    success: '.green-text'

}

export const messageTexts = {
    emailError: 'Invalid email format',
    passwordError: 'Invalid password',
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
    uploadInvoiceError: 'There was an error uploading the file. Please ensure the file is a .pdf, .jpg, .png, or other image file and try again.',
    dateError: 'Invoice date cannot be in the future or more than 90 days old.',
    invalidNumber: 'Invalid Invoice Number',
    invalidDueDate: 'Invalid Due Date',
    invalidTotal: 'Invalid Invoice Total',
    invalidCustomer: 'Invalid Customer Name',
    success: 'Got it!',
}

export const checkMessage = (selector, message) => {
    cy.get(selector).should('contain', message)
}