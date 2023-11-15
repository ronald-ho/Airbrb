import { apiCall } from '../../services/api';

/**
 * Logout a user
 * @returns {Promise<void>}
 */
export const logout = async () => {
  const response = await apiCall('user/auth/logout', 'POST');

  if (response.success) {
    localStorage.clear();
  } else {
    throw new Error(response.error);
  }
};
