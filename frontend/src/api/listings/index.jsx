import { apiCall } from '../../services/api';

/**
 * Publish a listing
 * @returns {Promise<{success: boolean, error: (*|string)}|{success: boolean, data: *}>}
 */
export const getAllListings = async () => {
  return await apiCall('/listings', 'GET');
}

/**
 * Get all listings by current user
 * @returns {Promise<*>}
 */
export const getAllListingsByUser = async () => {
  const currentUserEmail = localStorage.getItem('email');

  const listingsResponse = await getAllListings();

  return listingsResponse.data.filter(listing => {
    return listing.owner === currentUserEmail;
  });
}
