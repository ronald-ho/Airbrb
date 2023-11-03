import { apiCall } from '../../services/api';

/**
 * Publish a listing
 * @param listingId
 * @param {Array<object>} availability
 * @returns {Promise<*>}
 */
export const publishListing = async (listingId, availability) => {
  const response = await apiCall(`/listings/publish/${listingId}`, 'PUT', availability);

  if (response.success) {
    return response.data;
  } else {
    throw new Error(response.error);
  }
}

/**
 * Unpublish a listing
 * @param listingId
 * @returns {Promise<*>}
 */
export const unpublishListing = async (listingId) => {
  const response = await apiCall(`/listings/unpublish/${listingId}`, 'PUT');

  if (response.success) {
    return response.data;
  } else {
    throw new Error(response.error);
  }
}
