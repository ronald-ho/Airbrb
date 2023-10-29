import { apiCall } from '../../services/api';

/**
 * Create a new booking
 * @param listingId
 * @param bookingDetails
 * @returns {Promise<*>}
 */
export const createNewBooking = async (listingId, bookingDetails) => {
  const body = {
    ...bookingDetails
  };

  const response = await apiCall(`/bookings/new/${listingId}`, 'POST', body);

  if (response.success) {
    return response.data;
  } else {
    throw new Error(response.error);
  }
}

/**
 * Accept a booking
 * @param bookingId
 * @returns {Promise<*>}
 */
export const acceptBooking = async (bookingId) => {
  const response = await apiCall(`/bookings/accept/${bookingId}`, 'PUT');

  if (response.success) {
    return response.data;
  } else {
    throw new Error(response.error);
  }
}

/**
 * Decline a booking
 * @param bookingId
 * @returns {Promise<*>}
 */
export const declineBooking = async (bookingId) => {
  const response = await apiCall(`/bookings/decline/${bookingId}`, 'PUT');

  if (response.success) {
    return response.data;
  } else {
    throw new Error(response.error);
  }
}

/**
 * Delete a booking
 * @param bookingId
 * @returns {Promise<*>}
 */
export const deleteBooking = async (bookingId) => {
  const response = await apiCall(`/bookings/delete/${bookingId}`, 'DELETE');

  if (response.success) {
    return response.data;
  } else {
    throw new Error(response.error);
  }
}
