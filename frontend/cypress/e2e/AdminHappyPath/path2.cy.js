import {
  BASE_URL,
  createNewListing,
  login,
  logout,
  publishSecondListing,
  user1Credentials,
  user2Credentials
} from '../../support/helpers';

describe('Happy Path 2', () => {
  // Host logins successfully
  it('Host logins successfully', () => {
    cy.visit(`${BASE_URL}/`)
    login(user1Credentials);
  })

  // Host creates a new listing successfully with different price
  createNewListing('Cypress New Listing 2', '1500')

  // Host publishes the listing successfully with different dates
  publishSecondListing();

  // Guest searches for the listing successfully
  logout();
  login(user2Credentials);
  cy.get('[aria-label="Open Search"]').click();
  cy.get('input[placeholder="Check In / Out"]').click();

  cy.get('button[aria-label="Thu Nov 02 2023"]').click();
  cy.get('button[aria-label="Thu Nov 09 2023"]').click();

  cy.get('button:contains("Search")').click();

  cy.get('body').click(0, 0);

  cy.get('.css-f4h6uy').should('have.length', 1);

  // Guest makes 2 bookings successfully
  cy.get('.css-f4h6uy').click();
  cy.scrollTo(0, 500)

  cy.get('.css-1c6j008').click();
  cy.get('button[aria-label="Thu Nov 16 2023"]').click();
  cy.get('button[aria-label="Thu Nov 23 2023"]').click();
  cy.get('button:contains("Request to book")').click();

  cy.get('.css-1c6j008').click();
  cy.get('button[aria-label="Thu Nov 02 2023"]').click();
  cy.get('button[aria-label="Thu Nov 09 2023"]').click();
  cy.get('button:contains("Request to book")').click();

  // Host accepts the first booking successfully
  logout();
  login(user1Credentials);
  cy.get('a.chakra-link[href="/my-listings"]').click();
  cy.get('button:contains("My Bookings")').click();

  // Host declines the second booking successfully

  // Guest leaves a review for the first booking successfully
})
