import { apiCall } from '../../services/api';

/**
 * Review a listing
 * @param listingId
 * @param bookingId
 * @param {ReviewDto} review
 * @returns {Promise<*>}
 */
export const reviewListing = async (listingId, bookingId, review) => {
  const response = await apiCall(`/listings/${listingId}/review/${bookingId}`, 'PUT', review);

  if (response.success) {
    return response.data;
  } else {
    throw new Error(response.error);
  }
}
