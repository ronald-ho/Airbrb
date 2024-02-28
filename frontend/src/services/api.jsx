import axios from 'axios';

const API_BASE_URL = "https://airbrb-backend.vercel.app";

axios.interceptors.request.use(
  (config) => {

    console.log('Sending request:', config.url, config);

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
    console.log('Received response:', response.config.url, response);
    return response;
  },
  (error) => {
    console.error('Response error:', error);
    if (error.response) {
      console.error(`Error response from ${error.response.config.url}:`, error.response.status, error.response.data);
    }
    return Promise.reject(error);
  }
);

/**
 * Helper function to make API calls
 * @param endpoint {string} The desired API endpoint path
 * @param method {string} HTTP method (e.g., "GET", "POST")
 * @param data {object} (Optional) Data to send with the request
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
