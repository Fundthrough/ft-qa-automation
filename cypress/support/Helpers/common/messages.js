export const messageSelectors = {
    error: '.error',
    success: '.green-text',
}

export const messageTexts = {
    emailError: 'Invalid email format',
    passwordError: 'Invalid password',
    termsAndConditions:
        'Please indicate that you have read and agree to the Terms and Conditions and Privacy Policy.',
    uploadInvoiceError:
        'There was an error uploading the file. Please ensure the file is a .pdf, .jpg, .png, or other image file and try again.',
    dateError: 'Invoice date cannot be in the future or more than 90 days old.',
    invalidNumber: 'Invalid Invoice Number',
    invalidDueDate: 'Invalid Due Date',
    invalidTotal: 'Invalid Invoice Total',
    invalidCustomer: 'Invalid Customer Name',
    success: 'Got it!',
}

export const checkMessage = (messageType, message) => {
    cy.get(messageType).should('contain', message)
}
