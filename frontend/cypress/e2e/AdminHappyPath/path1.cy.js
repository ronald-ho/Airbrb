const BASE_URL = 'http://localhost:3000';

const user1Credentials = {
  name: 'New User1',
  email: 'newUser1@gmail.com',
  password: 'password'
}

const user2Credentials = {
  name: 'New User2',
  email: 'newUser2@gmail.com',
  password: 'password'
}

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
    editListing('New listing Title');
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

  const register = ({ name, email, password }) => {
    cy.get('button:contains("Sign In")').click();
    cy.get('a:contains("Register")').click();

    cy.get('#name').type(name);
    cy.get('#email').type(email);
    cy.get('#password').type(password);
    cy.get('#confirm-password').type(password);

    cy.get('button[type=submit]').click();
  }

  const login = ({ email, password }) => {
    cy.get('button:contains("Sign In")').click();
    cy.get('#email').type(email);
    cy.get('#password').type(password);

    cy.get('button[type=submit]').click();
  }

  const createNewListing = (title) => {
    cy.get('a.chakra-link[href="/my-listings"]').click();
    cy.url().should('include', '/my-listings');
    cy.get('button:contains("Create New Listing")').click();
    cy.url().should('include', '/create-listing')
    cy.contains('Express Creation').click();
    cy.url().should('include', '/create-listing/title');

    // Title Step
    cy.get('input[name="title"]').type(title);
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
  }

  const publishFirstListing = () => {
    cy.get('button:contains("Publish a Listing")').click();

    cy.get('.css-1cton11-control').click();

    cy.get('.css-d7l1ni-option').click();

    cy.get('div[tabindex="0"][aria-label="Choose Friday November 17 of 2023"]').click();

    cy.get('div[tabindex="-1"][aria-label="Choose Thursday November 30 of 2023"]').click();

    cy.get('button:contains("Publish")').click();
  }

  const editListing = (title) => {
    // Click on the first listing
    cy.get('.css-1pf2w37').click();

    // Editing the listing
    cy.get('label:contains("Title")')
      .next('input')
      .clear()
      .type(title);

    cy.get('label:contains("Thumbnail")').next('input[type="file"]').selectFile('cypress/fixtures/apple.jpeg');

    cy.get('a.chakra-link[href="/my-listings"]')
      .click();

    cy.wait(500);
  }

  const logout = () => {
    cy.get('button:contains("Sign Out")').click();
  }
});
