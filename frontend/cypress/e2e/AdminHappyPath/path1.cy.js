import {
  BASE_URL,
  user1Credentials,
  register,
  login,
  logout,
  user2Credentials,
  publishFirstListing,
  createNewListing,
  editListingTitleAndThumbnail
} from '../../support/helpers';

describe('Happy Path 1', () => {
  it('Registers successfully', () => {
    cy.visit(`${BASE_URL}/`)
    register(user1Credentials);
  });

  it('Logins successfully', () => {
    login(user1Credentials);
  })

  it('Creates a new listing successfully', () => {
    createNewListing('Cypress New Listing');
  });

  it('Updates the thumbnail and title of the listing successfully', () => {
    editListingTitleAndThumbnail('New listing Title', '100');
  });

  it('Publishes a listing successfully', () => {
    // Publish a listing steps here
    publishFirstListing();
  });

  it('Unpublishes a listing successfully', () => {
    // Unpublish a listing steps here
    cy.get('.css-1pf2w37').click();

    cy.get('button:contains("Unpublish Listing")').click();

    cy.get('button.chakra-button.css-jxg557').contains('Unpublish').click();

    // publish a listing again
    publishFirstListing();
  });

  it('Makes a booking successfully', () => {
    // Make a booking steps here
    // Logout
    cy.get('button:contains("Sign Out")').click();

    // register
    register(user2Credentials);

    // login
    login(user2Credentials);

    // make a booking
    cy.get('.css-1pf2w37').click();
    cy.scrollTo(0, 500)
    cy.get('.css-1c6j008').click();

    cy.get('button[aria-label="Thu Nov 16 2023"]').click();
    cy.get('button[aria-label="Thu Nov 23 2023"]').click();
    cy.get('button:contains("Request to book")').click();
  });

  it('Logs out of the application successfully', () => {
    // Logout steps here
    logout();
  });

  it('Logs back into the application successfully', () => {
    // Logout and login steps here
    login(user1Credentials);
  });
});
