const BASE_URL = 'http://localhost:3000';

describe('Registration', () => {
  it('should successfully register a user', () => {
    // Visit the registration page
    cy.visit(`${BASE_URL}/register`);

    // Fill out the registration form
    cy.get('#name').type('John Doe');
    cy.get('#email').type('johndoe@example.com');
    cy.get('#password').type('password');
    cy.get('#confirm-password').type('password');

    // Submit the registration form
    cy.get('button[type=submit]').click();

    // Assert that the registration was successful
    cy.url().should('include', `${BASE_URL}/login`); // Redirected to the login page

    // Check for a success toast notification
    cy.get('.chakra-toast__title').should('contain.text', 'Registration successful, please login');
  });

  it('should handle password mismatch', () => {
    // Visit the registration page
    cy.visit(`${BASE_URL}/register`);

    // Fill out the registration form with mismatched passwords
    cy.get('#name').type('Jane Doe');
    cy.get('#email').type('janedoe@example.com');
    cy.get('#password').type('password');
    cy.get('#confirm-password').type('differentpassword'); // Mismatched password

    // Submit the registration form
    cy.get('button[type=submit]').click();

    // Assert that an error popup is displayed
    cy.get('.chakra-modal__content').should('be.visible');
    cy.get('.chakra-modal__header').should('contain.text', 'Error');
    cy.get('.chakra-modal__body').should('contain.text', 'Passwords do not match');
  });
});
