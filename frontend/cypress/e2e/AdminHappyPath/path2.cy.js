import {
  BASE_URL,
  bookListing,
  createNewListing,
  login,
  logout,
  publishListing,
  user1Credentials,
  user2Credentials
} from '../../support/helpers';

describe('Happy Path 2', () => {
  it('Host logs in successfully', () => {
    cy.visit(`${BASE_URL}/`);
    login(user1Credentials);
  });

  it('Host creates a new listing successfully with different prices', () => {
    createNewListing('Cypress New Listing 2', '1500');
  });

  it('Updates the images of listing successfully', () => {
    cy.contains('.css-1pf2w37', 'Cypress New Listing 2').click();
    cy.get('button:contains("Images")').click();

    cy.get('label:contains("Images")').next('input[type="file"]').selectFile(['cypress/fixtures/banana.jpg', 'cypress/fixtures/pineapple.jpeg']);
  });

  it('Host publishes a listing successfully with different availabilities', () => {
    cy.get('a.chakra-link[href="/my-listings"]').click();
    publishListing('Wednesday November 01 of 2023', 'Friday November 17 of 2023');
  });

  it('Other user successfully searches for a listing', () => {
    logout();
    login(user2Credentials);
    cy.get('[aria-label="Open Search"]').click();
    cy.get('input[placeholder="Check In / Out"]').click();

    cy.get('button[aria-label="Thu Nov 02 2023"]').click();
    cy.get('button[aria-label="Thu Nov 09 2023"]').click();

    cy.get('button:contains("Search")').click();

    cy.get('.chakra-modal__overlay').click({ force: true });

    cy.get('.css-1pf2w37').should('have.length', 1);
  });

  it('Other user successfully books the listing twice', () => {
    cy.get('.css-1pf2w37').click();
    bookListing('Thu Nov 02 2023', 'Thu Nov 09 2023');
    bookListing('Thu Nov 16 2023', 'Thu Nov 23 2023');
  });

  it('Host successfully accepts one booking and rejects the other', () => {
    logout();
    login(user1Credentials);
    cy.get('a.chakra-link[href="/my-listings"]').click();
    cy.get('button:contains("My Bookings")').click();

    cy.get('.css-1cton11-control').click();

    cy.contains('.css-70qvj9', 'Cypress New Listing 2').click();

    // Declines the second booking
    cy.get('button:contains("Deny")').eq(0).click();

    // Accepts the second booking
    cy.get('button:contains("Accept")').click();
  });

  it('Guest is able to scroll through photos in carousel', () => {
    logout();
    login(user2Credentials);

    cy.contains('.css-1pf2w37', 'Cypress New Listing 2').click();

    for (let i = 0; i < 5; i++) {
      cy.get('button[aria-label="Next Image"]').click({ force: true });
    }
  });

  it('Other user successfully leaves a review', () => {
    cy.scrollTo(0, 500);

    cy.get('select.chakra-select.css-k7r2wc').select('3');
    cy.get('textarea.chakra-textarea.css-1vbcmny[aria-label="Review input"]').type('This is my review text.');

    cy.get('button:contains("Submit Review")').click();
  });
});
