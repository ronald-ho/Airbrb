const BASE_URL = 'http://localhost:3000';

describe('Create New Listing', () => {
  beforeEach(() => {
    cy.visit(`${BASE_URL}/login`);
    // Fill out the login form with valid credentials
    cy.get('#email').type('johndoe@example.com');
    cy.get('#password').type('password');

    // Submit the login form
    cy.get('button[type=submit]').click();
  });

  it('should navigate to /my-listings/', () => {
    cy.get('a.chakra-link[href="/my-listings"]')
      .click();
    cy.url().should('include', '/my-listings');
    cy.get('button:contains("Create New Listing")').click();
    cy.url().should('include', '/create-listing')
    cy.contains('Express Creation').click();
    cy.url().should('include', '/create-listing/title');

    cy.get('input[name="title"]').type('Cypress Testing Title');
    cy.contains('Next').click();

    cy.get('input[name="number"]').type('404');
    cy.get('input[name="street"]').type('Test Road');
    cy.get('input[name="city"]').type('Cypress');
    cy.get('input[name="state"]').type('NSW');
    cy.get('input[name="postcode"]').type('2000');
    cy.get('input[name="country"]').type('Australia');

    // Click the "Next" button
    cy.contains('Next').click();

    cy.get('input[name="price"]').type('100');
    cy.contains('Next').click();

    cy.get('input[type="url"]').type('https://www.youtube.com/watch?v=dQw4w9WgXcQ');
    cy.contains('Next').click();

    cy.get('img[alt="Apartment"]').click();
    cy.contains('Next').click();

    cy.get('button.chakra-button:contains("+")').click({ multiple: true });
    cy.contains('Next').click();

    cy.get('input[type="text"]').type('Wi-Fi, Air-conditioner, Pool');
    cy.contains('Submit').click();

    cy.get('.css-1pf2w37').click();

    cy.get('label:contains("Title")')
      .next('input')
      .clear()
      .type('New Title');

    cy.get('label:contains("Thumbnail")').next('input[type="file"]').selectFile('cypress/fixtures/apple.jpeg');

    cy.get('a.chakra-link[href="/my-listings"]')
      .click();

    cy.wait(500);

    // publish a listing
    cy.get('button:contains("Publish a Listing")').click();

    cy.get('.css-1cton11-control').click();

    cy.get('.css-d7l1ni-option').click();

    cy.get('div[tabindex="0"][aria-label="Choose Friday November 17 of 2023"]').click();

    cy.get('div[tabindex="-1"][aria-label="Choose Thursday November 30 of 2023"]').click();

    cy.get('button:contains("Publish")').click();

    // unpublish a listing
    cy.get('.css-1pf2w37').click();

    cy.get('button:contains("Unpublish Listing")').click();

    cy.get('button.chakra-button.css-jxg557').contains('Unpublish').click();

    // Logout

    // register

    // login

    // make a booking

    // logout

    // login
  });
});
