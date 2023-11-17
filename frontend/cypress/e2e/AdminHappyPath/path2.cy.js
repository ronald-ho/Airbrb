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
  // Host logins successfully
  it('Host logins successfully', () => {
    cy.visit(`${BASE_URL}/`)
    login(user1Credentials);

    // Host creates a new listing successfully with different price
    createNewListing('Cypress New Listing 2', '1500')

    // Host publishes the listing successfully with different dates
    publishListing('Wednesday November 01 of 2023', 'Friday November 17 of 2023');

    // Guest searches for the listing successfully
    logout();
    login(user2Credentials);
    cy.get('[aria-label="Open Search"]').click();
    cy.get('input[placeholder="Check In / Out"]').click();

    cy.get('button[aria-label="Thu Nov 02 2023"]').click();
    cy.get('button[aria-label="Thu Nov 09 2023"]').click();

    cy.get('button:contains("Search")').click();

    cy.get('.chakra-modal__overlay').click({ force: true });

    cy.get('.css-1pf2w37').should('have.length', 1);

    // Guest makes 2 bookings successfully

    cy.get('.css-1pf2w37').click();
    bookListing('Thu Nov 02 2023', 'Thu Nov 09 2023');
    bookListing('Thu Nov 16 2023', 'Thu Nov 23 2023');

    // Host accepts the first booking successfully
    logout();
    login(user1Credentials);
    cy.get('a.chakra-link[href="/my-listings"]').click();
    cy.get('button:contains("My Bookings")').click();

    // Host declines the second booking successfully

    cy.get('.css-1cton11-control').click();

    cy.contains('.css-70qvj9', 'Cypress New Listing 2').click();

    // Declines the second booking
    cy.get('button:contains("Deny")').eq(0).click();

    // Accepts the second booking
    cy.get('button:contains("Accept")').click();

    // Guest leaves a review for the first booking successfully
    logout();

    login(user2Credentials);

    cy.contains('.css-1pf2w37', 'Cypress New Listing 2').click();
    cy.scrollTo(0, 500);

    cy.get('select.chakra-select.css-k7r2wc').select('3');
    cy.get('textarea.chakra-textarea.css-1vbcmny[aria-label="Review input"]').type('This is my review text.');

    cy.get('button:contains("Submit Review")').click();
  })
})
