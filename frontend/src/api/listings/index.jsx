import { apiCall } from '../../services/api';

/**
 * Publish a listing
 * @returns {Promise<{success: boolean, error: (*|string)}|{success: boolean, data: *}>}
 */
export const getAllListings = async () => {
  return await apiCall('/listings', 'GET');
}
