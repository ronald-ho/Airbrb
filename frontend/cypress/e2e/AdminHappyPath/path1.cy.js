const BASE_URL = 'http://localhost:3000';

describe('Happy Path 1', () => {
  it('Registers successfully', () => {
    cy.visit(`${BASE_URL}/`)
    cy.get('button:contains("Sign In")').click();
    cy.get('a:contains("Register")').click();

    cy.get('#name').type('New User');
    cy.get('#email').type('newUser@gmail.com');
    cy.get('#password').type('password');
    cy.get('#confirm-password').type('password');

    cy.get('button[type=submit]').click();
  });

  it('Logins successfully', () => {
    cy.get('#email').type('newUser@gmail.com');
    cy.get('#password').type('password');

    cy.get('button[type=submit]').click();
  })

  it('Creates a new listing successfully', () => {
    cy.get('a.chakra-link[href="/my-listings"]').click();
    cy.url().should('include', '/my-listings');
    cy.get('button:contains("Create New Listing")').click();
    cy.url().should('include', '/create-listing')
    cy.contains('Express Creation').click();
    cy.url().should('include', '/create-listing/title');

    // Title Step
    cy.get('input[name="title"]').type('Cypress Testing Title');
    cy.contains('Next').click();

    // Address Step
    cy.get('input[name="number"]').type('404');
    cy.get('input[name="street"]').type('Test Road');
    cy.get('input[name="city"]').type('Cypress');
    cy.get('input[name="state"]').type('NSW');
    cy.get('input[name="postcode"]').type('2000');
    cy.get('input[name="country"]').type('Australia');
    cy.contains('Next').click();

    // Price Step
    cy.get('input[name="price"]').type('100');
    cy.contains('Next').click();

    // Thumbnail Step
    cy.get('input[type="url"]').type('https://www.youtube.com/watch?v=dQw4w9WgXcQ');
    cy.contains('Next').click();

    // Property Type Step
    cy.get('img[alt="Apartment"]').click();
    cy.contains('Next').click();

    // Details Step
    cy.get('button.chakra-button:contains("+")').click({ multiple: true });
    cy.contains('Next').click();

    // Amenities Step
    cy.get('input[type="text"]').type('Wi-Fi, Air-conditioner, Pool');
    cy.contains('Submit').click();
  });

  it('Updates the thumbnail and title of the listing successfully', () => {
    // Click on the first listing
    cy.get('.css-1pf2w37').click();

    // Editing the listing
    cy.get('label:contains("Title")')
      .next('input')
      .clear()
      .type('New Title');

    cy.get('label:contains("Thumbnail")').next('input[type="file"]').selectFile('cypress/fixtures/apple.jpeg');

    cy.get('a.chakra-link[href="/my-listings"]')
      .click();

    cy.wait(500);
  });

  it('Publishes a listing successfully', () => {
    // Publish a listing steps here
    cy.get('button:contains("Publish a Listing")').click();

    cy.get('.css-1cton11-control').click();

    cy.get('.css-d7l1ni-option').click();

    cy.get('div[tabindex="0"][aria-label="Choose Friday November 17 of 2023"]').click();

    cy.get('div[tabindex="-1"][aria-label="Choose Thursday November 30 of 2023"]').click();

    cy.get('button:contains("Publish")').click();
  });

  it('Unpublishes a listing successfully', () => {
    // Unpublish a listing steps here
    cy.get('.css-1pf2w37').click();

    cy.get('button:contains("Unpublish Listing")').click();

    cy.get('button.chakra-button.css-jxg557').contains('Unpublish').click();

    // publish a listing again
    cy.get('button:contains("Publish a Listing")').click();

    cy.get('.css-1cton11-control').click();

    cy.get('.css-d7l1ni-option').click();

    cy.get('div[tabindex="0"][aria-label="Choose Friday November 17 of 2023"]').click();

    cy.get('div[tabindex="-1"][aria-label="Choose Thursday November 30 of 2023"]').click();

    cy.get('button:contains("Publish")').click();
  });

  it('Makes a booking successfully', () => {
    // Make a booking steps here
    // Logout
    cy.get('button:contains("Sign Out")').click();

    // register
    cy.get('button:contains("Sign In")').click();
    cy.get('a:contains("Register")').click();

    cy.get('#name').type('New User');
    cy.get('#email').type('newUser1@gmail.com');
    cy.get('#password').type('password');
    cy.get('#confirm-password').type('password');

    cy.get('button[type=submit]').click();

    // login
    cy.get('#email').type('newUser1@gmail.com');
    cy.get('#password').type('password');

    cy.get('button[type=submit]').click();

    // make a booking
    cy.get('.css-1pf2w37').click();
    cy.get('#popover-trigger-39').click();

    cy.get('button[aria-label="Thu Nov 16 2023"]').click();
    cy.get('button[aria-label="Thu Nov 23 2023"]').click();
    cy.get('button:contains("Request to book")').click();
  });

  it('Logs out of the application successfully', () => {
    // Logout steps here
    cy.get('button:contains("Sign Out")').click();
  });

  it('Logs back into the application successfully', () => {
    // Logout and login steps here
    cy.get('button:contains("Sign In")').click();

    cy.get('#email').type('newUser@gmail.com');
    cy.get('#password').type('password');

    cy.get('button[type=submit]').click();
  });
});
