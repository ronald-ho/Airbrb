import { apiCall } from '../../services/api';
import { getListing } from './actions';
import { convertToListingDTOs } from '../../dto/ListingDto';

/**
 * Publish a listing
 * @returns {Promise<{success: boolean, error: (*|string)}|{success: boolean, data: *}>}
 */
export const getAllListings = async () => {
  return await apiCall('listings', 'GET');
}

/**
 * Get all listing Details by user
 * @returns {ListingDto[]}
 */
export const getAllListingDetailsByUser = async () => {
  const currentUserEmail = localStorage.getItem('email');

  const listingsResponse = await getAllListings();

  console.log(`LISTINGS RESPONSE: ${JSON.stringify(listingsResponse)}`);

  const userListings = listingsResponse.data.listings.filter(listing => {
    return listing.owner === currentUserEmail;
  });

  console.log(`USER LISITINGS: ${JSON.stringify(userListings)}`);

  const listingIds = userListings.map(listing => listing.id);

  console.log(`USER LISTING IDS: ${JSON.stringify(listingIds)}`);

  const listingDetails = await Promise.all(
    listingIds.map(async listingId => {
      const listingDetails = await getListing(listingId);
      return listingDetails.data.listing;
    })
  );

  console.log(`USER LISTING DETAILS: ${JSON.stringify(listingDetails)}`);

  const listingDTOs = convertToListingDTOs(listingDetails);

  console.log(`USER LISTING DTOS: ${JSON.stringify(listingDTOs)}`);

  return convertToListingDTOs(listingDetails);
}
