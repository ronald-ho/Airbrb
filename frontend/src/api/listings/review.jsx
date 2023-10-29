import { apiCall } from '../../services/api';

/**
 * Review a listing
 * @param listingId
 * @param bookingId
 * @param review
 * @returns {Promise<*>}
 */
export const reviewListing = async (listingId, bookingId, review) => {
  const body = {
    review
  };

  const response = await apiCall(`/listings/${listingId}/review/${bookingId}`, 'PUT', body);

  if (response.success) {
    return response.data;
  } else {
    throw new Error(response.error);
  }
}
