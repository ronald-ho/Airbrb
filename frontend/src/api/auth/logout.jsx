import { apiCall } from '../../services/api';

/**
 * Logout a user
 * @returns {Promise<void>}
 */
const logout = async () => {
  const response = await apiCall('user/auth/logout', 'POST');

  if (response.success) {
    localStorage.removeItem('token');
  } else {
    throw new Error(response.error);
  }
};
