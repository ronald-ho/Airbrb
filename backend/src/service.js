const { Pool } = require('pg');
const jwt = require('jsonwebtoken');
const AsyncLock = require('async-lock');

const { InputError, AccessError } = require('./error');

const lock = new AsyncLock();

const JWT_SECRET = process.env.JWT_SECRET;

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
});

/***************************************************************
                       Helper Functions
***************************************************************/

export const resourceLock = (callback) =>
  new Promise((resolve, reject) => {
    lock.acquire('resourceLock', (done) => {
      try {
        callback(resolve, reject);
      } catch (error) {
        reject(error);
      } finally {
        done();
      }
    }, {}, (err) => {
      if (err) {
        reject(err);
      }
    });
  });

/***************************************************************
                       Auth Functions
***************************************************************/

export const getEmailFromAuthorization = async (authorization) => {
  try {
    const token = authorization.replace('Bearer ', '');
    const { email } = jwt.verify(token, JWT_SECRET);
    // Check if email exists in the database
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (result.rows.length !== 1) {
      throw new AccessError('Invalid Token');
    }
    return email;
  } catch {
    throw new AccessError('Invalid Token');
  }
};

export const login = (email, password) =>
  resourceLock(async (resolve, reject) => {
    if (!email) {
      return reject(new InputError('Must provide an email for user login'));
    } else if (!password) {
      return reject(new InputError('Must provide a password for user login'));
    }

    try {
      // Check user credentials against database
      const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
      if (result.rows.length !== 1 || result.rows[0].password !== password) {
        return reject(new InputError('Invalid email or password'));
      }

      // Successful login, set user as active and generate JWT token
      const user = result.rows[0];
      user.sessionActive = true;
      await pool.query('UPDATE users SET session_active = $1 WHERE email = $2', [true, email]);
      const token = jwt.sign({ email }, JWT_SECRET, { algorithm: 'HS256' });
      resolve(token);
    } catch (error) {
      console.error('Error logging in user:', error);
      reject(new Error('Login failed'));
    }
  });

export const logout = (email) =>
  resourceLock(async (resolve, reject) => {
    try {
      // Update user session to inactive in the database
      await pool.query('UPDATE users SET session_active = $1 WHERE email = $2', [false, email]);
      resolve();
    } catch (error) {
      console.error('Error logging out user:', error);
      reject(new Error('Logout failed'));
    }
  });

export const register = (email, password, name) =>
  resourceLock(async (resolve, reject) => {
    if (!email) {
      return reject(new InputError('Must provide an email for user registration'));
    } else if (!password) {
      return reject(new InputError('Must provide a password for user registration'));
    } else if (!name) {
      return reject(new InputError('Must provide a name for user registration'));
    }

    try {
      // Check for existing email in database
      const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
      if (result.rows.length > 0) {
        return reject(new InputError('Email address already registered'));
      }

      // Insert new user into database
      await pool.query('INSERT INTO users (email, password, name) VALUES ($1, $2, $3)', [email, password, name]);

      // Successful registration, generate JWT token
      const token = jwt.sign({ email }, JWT_SECRET, { algorithm: 'HS256' });
      resolve(token);
    } catch (error) {
      console.error('Error registering user:', error);
      reject(new Error('Registration failed'));
    }
  });

/***************************************************************
                       Listing Functions
***************************************************************/

export const assertOwnsListing = async (email, listingId) => {
  try {
    // Check if listing exists and user owns it
    const result = await pool.query('SELECT * FROM listings WHERE id = $1 AND owner = $2', [listingId, email]);
    if (result.rows.length !== 1) {
      throw new InputError('Invalid listing ID or user does not own this listing');
    }
  } catch (error) {
    console.error('Error verifying listing ownership:', error);
    throw new Error('Internal server error');
  }
};

export const assertOwnsBooking = async (email, bookingId) => {
  try {
    // Check if booking exists and user owns it
    const result = await pool.query('SELECT * FROM bookings WHERE id = $1 AND owner = $2', [bookingId, email]);
    if (result.rows.length !== 1) {
      throw new InputError('Invalid booking ID or user does not own this booking');
    }
  } catch (error) {
    console.error('Error verifying booking ownership:', error);
    throw new Error('Internal server error');
  }
};

export const addListing = async (title, owner, address, price, thumbnail, metadata) =>
    resourceLock(async (resolve, reject) => {
      // Log incoming parameters to see what is being passed into the function
      console.log(`addListing called with title: ${title}, owner: ${owner}, address: ${address}, price: ${price}, thumbnail: ${thumbnail}, metadata: ${metadata}`);

      if (title === undefined) {
        return reject(new InputError('Must provide a title for new listing'));
      } else if (price === undefined || isNaN(price)) {
        return reject(new InputError('Must provide a valid price for new listing'));
      } else if (thumbnail === undefined) {
        return reject(new InputError('Must provide a thumbnail for new listing'));
      } else if (metadata === undefined) {
        return reject(new InputError('Must provide property details for this listing'));
      } else {
        try {
          // Check for existing title before inserting
          const titleCheck = await pool.query('SELECT * FROM listings WHERE title = $1', [title]);
          if (titleCheck.rows.length > 0) {
            return reject(new InputError('A listing with this title already exists'));
          }

          // Before inserting, log the final check to ensure all values are as expected
          console.log(`Inserting new listing with title: ${title}, owner: ${owner}`);

          // Insert new listing into database
          const result = await pool.query('INSERT INTO listings (title, owner, address, price, thumbnail, metadata) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id', [title, owner, address, price, thumbnail, metadata]);
          const id = result.rows[0].id;

          // Log successful insertion
          console.log(`Listing added successfully with ID: ${id}`);

          resolve(id);
        } catch (error) {
          // Log detailed error if insertion fails
          console.error('Error adding listing to database:', error);
          reject(new Error('Internal server error'));
        }
      }
    });

export const getListingDetails = async (listingId) => {
  try {
    // Fetch listing details from database
    const result = await pool.query(
      `SELECT l.*, r.*, a.*
      FROM listings AS l
      LEFT JOIN reviews AS r ON l.id = r.listing_id
      LEFT JOIN availabilities AS a ON l.id = a.listing_id
      WHERE l.id = $1`,
      [listingId]
    );

    if (result.rows.length === 0) {
      throw new InputError('Invalid listing ID');
    }

    const listingData = result.rows[0];
    const reviews = result.rows.filter((row) => row.listing_id === listingId); 
    const availabilities = result.rows.filter((row) => row.listing_id === listingId); 

    listingData.reviews = reviews;
    listingData.availabilities = availabilities;

    return listingData;
  } catch (error) {
    console.error('Error getting listing details:', error);
    throw new Error('Internal server error');
  }
};

export const getAllListings = async () => {
  try {
    // Fetch all listings from the database
    const result = await pool.query('SELECT * FROM listings');
    return result.rows;
  } catch (error) {
    console.error('Error fetching all listings:', error);
    throw new Error('Internal server error');
  }
};

export const updateListing = async (listingId, title, address, thumbnail, price, metadata) => {
  try {
    if (!listingId) {
      throw new Error('Invalid listing ID');
    }

    const updateValues = [listingId];
    const updateStatementParts = [];

    if (metadata && typeof metadata === 'object') {
      metadata = JSON.stringify(metadata);
    }

    if (title) {
      updateValues.push(title);
      updateStatementParts.push('title = $' + updateValues.length);
    }

    if (address) {
      updateValues.push(address);
      updateStatementParts.push('address = $' + updateValues.length);
    }

    if (thumbnail) {
      updateValues.push(thumbnail);
      updateStatementParts.push('thumbnail = $' + updateValues.length);
    }

    if (price) {
      updateValues.push(price);
      updateStatementParts.push('price = $' + updateValues.length);
    }

    if (metadata) {
      updateValues.push(metadata);
      updateStatementParts.push('metadata = $' + updateValues.length);
    }

    const updateString = `UPDATE listings SET ${updateStatementParts.join(', ')} WHERE id = $1`;

    console.log("updateString: ", updateString);
    console.log("updateValues: ", updateValues);

    await pool.query(updateString, updateValues);
  } catch (error) {
    console.error('Error updating listing:', error);
    throw new Error('Internal server error');
  }
};

export const removeListing = async (listingId) =>
  resourceLock(async (resolve, reject) => {
    try {
      // Delete listing from the database
      await pool.query('DELETE FROM listings WHERE id = $1', [listingId]);
      resolve();
    } catch (error) {
      console.error('Error removing listing:', error);
      reject(new Error('Internal server error'));
    }
  });

export const publishListing = async (listingId, availability) =>
  resourceLock(async (resolve, reject) => {
    if (availability === undefined) {
      return reject(new InputError('Must provide listing availability'));
    } else {
      try {
        // Check if listing exists before publishing
        const result = await pool.query('SELECT * FROM listings WHERE id = $1', [listingId]);
        if (result.rows.length !== 1) {
          return reject(new InputError('Invalid listing ID'));
        } else if (result.rows[0].published === true) {
          return reject(new InputError('This listing is already published'));
        }

        const stringifyAvailability = JSON.stringify(availability);

        // Update listing details in the database
        await pool.query('UPDATE listings SET availability = $1, published = true, posted_on = $2 WHERE id = $3', [availability, new Date().toISOString(), listingId]);
        resolve();
      } catch (error) {
        console.error('Error publishing listing:', error);
        reject(new Error('Internal server error'));
      }
    }
  });

export const unpublishListing = async (listingId) =>
  resourceLock(async (resolve, reject) => {
    try {
      // Check if listing exists before unpublishing
      const result = await pool.query('SELECT * FROM listings WHERE id = $1', [listingId]);
      if (result.rows.length !== 1) {
        return reject(new InputError('Invalid listing ID'));
      } else if (result.rows[0].published === false) {
        return reject(new InputError('This listing is already unpublished'));
      }

      // Update listing details in the database
      await pool.query('UPDATE listings SET availability = $1, published = false, posted_on = null WHERE id = $2', [[], listingId]);
      resolve();
    } catch (error) {
      console.error('Error unpublishing listing:', error);
      reject(new Error('Internal server error'));
    }
  });

export const leaveListingReview = async (email, listingId, bookingId, review) =>
  resourceLock(async (resolve, reject) => {
    try {
      // Check for valid booking and listing
      const bookingResult = await pool.query('SELECT * FROM bookings WHERE id = $1 AND owner = $2', [bookingId, email]);
      const listingResult = await pool.query('SELECT * FROM listings WHERE id = $1', [listingId]);

      if (bookingResult.rows.length !== 1) {
        return reject(new InputError('Invalid booking ID'));
      } else if (listingResult.rows.length !== 1) {
        return reject(new InputError('Invalid listing ID'));
      } else if (bookingResult.rows[0].listing_id !== listingId) {
        return reject(new InputError('This booking is not associated with this listing ID'));
      } else if (review === undefined) {
        return reject(new InputError('Must provide review contents'));
      }

      // Insert new review into database
      await pool.query('INSERT INTO reviews (listing_id, booking_id, owner, review) VALUES ($1, $2, $3, $4)', [listingId, bookingId, email, review]);
      resolve();
    } catch (error) {
      console.error('Error leaving review:', error);
      reject(new Error('Internal server error'));
    }
  });

/***************************************************************
 Booking Functions
 ***************************************************************/

export const makeNewBooking = async (owner, dateRange, totalPrice, listingId) =>
  resourceLock(async (resolve, reject) => {
    try {
      // Check for valid listing and availability
      const listingResult = await pool.query('SELECT * FROM listings WHERE id = $1', [listingId]);
      if (listingResult.rows.length !== 1) {
        return reject(new InputError('Invalid listing ID'));
      } else if (listingResult.rows[0].published === false) {
        return reject(new InputError('Cannot make a booking for an unpublished listing'));
      } else if (listingResult.rows[0].owner === owner) {
        return reject(new InputError('Cannot make bookings for your own listings'));
      }

      // Insert new booking into database
      const result = await pool.query('INSERT INTO bookings (owner, date_range, total_price, listing_id) VALUES ($1, $2, $3, $4) RETURNING id', [owner, dateRange, totalPrice, listingId]);
      const id = result.rows[0].id;

      resolve(id);
    } catch (error) {
      console.error('Error creating booking:', error);
      reject(new Error('Internal server error'));
    }
  });

export const getAllBookings = async () => {
  try {
    // Fetch all bookings from the database
    const result = await pool.query('SELECT * FROM bookings');
    return result.rows;
  } catch (error) {
    console.error('Error fetching all bookings:', error);
    throw new Error('Internal server error');
  }
};

export const removeBooking = async (bookingId) =>
  resourceLock(async (resolve, reject) => {
    try {
      // Delete booking from the database
      await pool.query('DELETE FROM bookings WHERE id = $1', [bookingId]);
      resolve();
    } catch (error) {
      console.error('Error removing booking:', error);
      reject(new Error('Internal server error'));
    }
  });
export const acceptBooking = async (owner, bookingId) =>
  resourceLock(async (resolve, reject) => {
    try {
      // Check for valid booking and ownership
      const bookingResult = await pool.query('SELECT * FROM bookings WHERE id = $1', [bookingId]);
      const listingResult = await pool.query('SELECT * FROM listings WHERE id = $1', [bookingResult.rows[0].listing_id]);

      if (bookingResult.rows.length !== 1) {
        return reject(new InputError('Invalid booking ID'));
      } else if (listingResult.rows.length !== 1 || listingResult.rows[0].owner !== owner) {
        return reject(new InputError("Cannot accept bookings for a listing that isn't yours"));
      } else if (bookingResult.rows[0].status === 'accepted') {
        return reject(new InputError('Booking has already been accepted'));
      } else if (bookingResult.rows[0].status === 'declined') {
        return reject(new InputError('Booking has already been declined'));
      }

      // Update booking status in the database
      await pool.query('UPDATE bookings SET status = $1 WHERE id = $2', ['accepted', bookingId]);
      resolve();
    } catch (error) {
      console.error('Error accepting booking:', error);
      reject(new Error('Internal server error'));
    }
  });

export const declineBooking = async (owner, bookingId) =>
  resourceLock(async (resolve, reject) => {
    try {
      // Check for valid booking and ownership
      const bookingResult = await pool.query('SELECT * FROM bookings WHERE id = $1', [bookingId]);
      const listingResult = await pool.query('SELECT * FROM listings WHERE id = $1', [bookingResult.rows[0].listing_id]);

      if (bookingResult.rows.length !== 1) {
        return reject(new InputError('Invalid booking ID'));
      } else if (listingResult.rows.length !== 1 || listingResult.rows[0].owner !== owner) {
        return reject(new InputError("Cannot accept bookings for a listing that isn't yours"));
      } else if (bookingResult.rows[0].status === 'declined') {
        return reject(new InputError('Booking has already been declined'));
      } else if (bookingResult.rows[0].status === 'accepted') {
        return reject(new InputError('Booking has already been accepted'));
      }

      // Update booking status in the database
      await pool.query('UPDATE bookings SET status = $1 WHERE id = $2', ['declined', bookingId]);
      resolve();
    } catch (error) {
      console.error('Error declining booking:', error);
      reject(new Error('Internal server error'));
    }
  });
