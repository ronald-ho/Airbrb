import {
  BASE_URL,
  bookListing,
  createNewListing,
  editListingTitleAndThumbnail,
  login,
  logout,
  publishListing,
  register,
  user1Credentials,
  user2Credentials
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
    createNewListing('Cypress New Listing', '100');
  });

  it('Updates the thumbnail and title of the listing successfully', () => {
    editListingTitleAndThumbnail('New listing Title');
  });

  it('Publishes a listing successfully', () => {
    // Publish a listing steps here
    publishListing('Friday November 17 of 2023', 'Thursday November 30 of 2023');
  });

  it('Unpublishes a listing successfully', () => {
    // Unpublish a listing steps here
    cy.get('.css-1pf2w37').click();

    cy.get('button:contains("Unpublish Listing")').click();

    cy.get('button.chakra-button.css-jxg557').contains('Unpublish').click();

    // publish a listing again
    publishListing('Friday November 17 of 2023', 'Thursday November 30 of 2023');
  });

  it('Makes a booking successfully', () => {
    // Make a booking steps here
    // Logout
    cy.get('button:contains("Sign Out")').click();

    // register
    register(user2Credentials);

    // login
    login(user2Credentials);

    cy.get('.css-1pf2w37').click();
    bookListing('Thu Nov 16 2023', 'Thu Nov 23 2023');
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
