import { apiCall } from '../../services/api';

/**
 * Login a user with email and password
 * @param email
 * @param password
 * @returns {Promise<void>}
 */
const login = async (email, password) => {
  const body = {
    email,
    password
  };

  const response = await apiCall('user/auth/login', 'POST', body);

  if (response.success) {
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    } else {
      throw new Error('Unexpected response from server');
    }
  } else {
    throw new Error(response.error);
  }
};
