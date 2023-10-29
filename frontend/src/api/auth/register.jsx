import { apiCall } from '../../services/api';

/**
 * Register a new user with email, password, and name
 * @param email
 * @param password
 * @param name
 * @returns {Promise<void>}
 */
const register = async (email, password, name) => {
  const body = {
    email,
    password,
    name
  };

  const response = await apiCall('user/auth/register', 'POST', body);

  if (response.success) {
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    } else {
      throw new Error('Unexpected response from server');
    }
  } else {
    throw new Error(response.error);
  }
}
