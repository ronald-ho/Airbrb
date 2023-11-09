import config from '../config';
import axios from 'axios';

const API_BASE_URL = config.API_BASE_URL;

axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    console.log(`Sending ${config.method.toUpperCase()} request to ${config.url}\n Data: ${JSON.stringify(config.data)}\n Headers:, ${config.headers}`);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    console.log(`Received response from ${response.config.url}:`, response);
    return response;
  },
  (error) => {
    console.error('Error in response:', error.response.data);
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

  if (['POST', 'PUT', 'PATCH'].includes(method.toUpperCase())) {
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
