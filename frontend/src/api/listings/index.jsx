import { apiCall } from '../../services/api';
import { getListing } from './actions';

/**
 * Publish a listing
 * @returns {Promise<{success: boolean, error: (*|string)}|{success: boolean, data: *}>}
 */
export const getAllListings = async () => {
  return await apiCall('listings', 'GET');
}

export const getAllListingDetailsByUser = async () => {
  const currentUserEmail = localStorage.getItem('email');

  const listingsResponse = await getAllListings();

  const userListings = listingsResponse.data.listings.filter(listing => {
    return listing.owner === currentUserEmail;
  });

  const listingIds = userListings.map(listing => listing.id);

  return await Promise.all(
    listingIds.map(async listingId => {
      const listingDetails = await getListing(listingId);
      return {
        id: listingId,
        ...listingDetails.data.listing,
      };
    })
  );
}
