import { apiCall } from '../../services/api';

/**
 * Get all bookings
 * @returns {Promise<{success: boolean, error: (*|string)}|{success: boolean, data: *}>}
 */
export const getAllBookings = async () => {
  return await apiCall('bookings', 'GET');
}
