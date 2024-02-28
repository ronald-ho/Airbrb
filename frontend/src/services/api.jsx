import axios from 'axios';
import config from '../config';

const API_BASE_URL = process.env.API_BASE_URL;

axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * Helper function to make API calls
 * @param endpoint
 * @param method
 * @param data
 * @returns {Promise<{success: boolean, error: (*|string)}|{success: boolean, data: any}>}
 */
export const apiCall = async (endpoint, method, data = null) => {
  const config = {
    method,
    url: `${API_BASE_URL}/${endpoint}`,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  if (data) {
    config.data = data;
  }

  try {
    const response = await axios(config);
    return {
      success: true,
      data: response.data
    };
  } catch (error) {
    return {
      success: false,
      error: (error.response && error.response.data && error.response.data.error)
        ? error.response.data.error
        : 'Unknown error occurred'
    };
  }
};
