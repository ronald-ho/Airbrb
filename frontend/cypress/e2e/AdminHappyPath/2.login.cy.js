const BASE_URL = 'http://localhost:3000';

describe('Login', () => {
  beforeEach(() => {
    // Visit the login page before each test
    cy.visit(`${BASE_URL}/login`);
  });

  it('should successfully log in a user with valid credentials', () => {
    // Fill out the login form with valid credentials
    cy.get('#email').type('johndoe@example.com');
    cy.get('#password').type('password');

    // Submit the login form
    cy.get('button[type=submit]').click();

    // Assert that the login was successful
    cy.url().should('eq', `${BASE_URL}/`); // Redirected to the home page

    // Check for a success toast notification
    cy.get('.chakra-toast__title').should('contain.text', 'Login Successful');
  });

  it('should display an error message for invalid credentials', () => {
    // Fill out the login form with invalid credentials
    cy.get('#email').type('invalid@example.com');
    cy.get('#password').type('Invalid email or password');

    // Submit the login form
    cy.get('button[type=submit]').click();

    // Assert that an error popup is displayed
    cy.get('.chakra-modal__content').should('be.visible');
    cy.get('.chakra-modal__header').should('contain.text', 'Error');
    cy.get('.chakra-modal__body').should('contain.text', 'Invalid email or password');
  });
});
