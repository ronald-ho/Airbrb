import { apiCall } from '../../services/api';

// /**
//  * Creates a new listing
//  * @param {NewListingDto} newListingDto
//  * @returns {Promise<*>}
//  */
export const createNewListing = async (newListingDto) => {
  const response = await apiCall('listings/new', 'POST', newListingDto);

  if (response.success) {
    return response.data;
  } else {
    throw new Error(response.error);
  }
}

/**
 * Gets a listing by its ID
 * @param listingId
 * @returns {Promise<{success: boolean, error: (*|string)}|{success: boolean, data: *}>}
 */
export const getListing = async (listingId) => {
  return await apiCall(`listings/${listingId}`, 'GET')
}

/**
 * Update a Listing
 * @param listingId
 * @param {{}} newListingDto
 * @returns {Promise<*>}
 */
export const updateListing = async (listingId, newListingDto) => {
  const response = await apiCall(`listings/${listingId}`, 'PUT', newListingDto);

  if (response.success) {
    return response.data;
  } else {
    throw new Error(response.error);
  }
}

/**
 * Delete a Listing
 * @param listingId
 * @returns {Promise<*>}
 */
export const deleteListing = async (listingId) => {
  const response = await apiCall(`listings/${listingId}`, 'DELETE');

  if (response.success) {
    return response.data;
  } else {
    throw new Error(response.error);
  }
}
