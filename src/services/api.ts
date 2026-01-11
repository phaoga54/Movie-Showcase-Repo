import { TMDB_ACCESS_TOKEN, TMDB_API_BASE_URL } from '@/src/config/api.config';
import axios, { AxiosError, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

// Create axios instance
const apiClient: AxiosInstance = axios.create({
  baseURL: TMDB_API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Add Authorization header with Bearer token
    if (TMDB_ACCESS_TOKEN) {
      config.headers.Authorization = `Bearer ${TMDB_ACCESS_TOKEN}`;
    } else {
      console.warn('TMDB_ACCESS_TOKEN is not set. Please add it to your .env file');
    }

    // Log request (development only)
    if (__DEV__) {
      console.log('API Request:', JSON.stringify(config));
    }

    return config;
  },
  (error: AxiosError) => {
    // Handle request error
    if (__DEV__) {
      console.error('Request Error:', error);
    }
    return Promise.reject(error);
  }
);

// Response interceptor
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    // Log response (development only)
    if (__DEV__) {
    }

    return response;
  },
  (error: AxiosError) => {
    // Handle response error
    if (__DEV__) {
      console.error('Response Error:', {
        status: error.response?.status,
        message: error.message,
        data: error.response?.data,
      });
    }

    // Handle specific error cases
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // Unauthorized - invalid or missing API token
          console.error('API Error: Invalid or missing API token');
          break;
        case 404:
          // Not found
          console.error('API Error: Resource not found');
          break;
        case 429:
          // Too many requests
          console.error('API Error: Rate limit exceeded');
          break;
        case 500:
          // Server error
          console.error('API Error: Server error');
          break;
        default:
          console.error('API Error:', error.response.status);
      }
    } else if (error.request) {
      // Request made but no response received
      console.error('API Error: No response received');
    } else {
      // Error setting up request
      console.error('API Error:', error.message);
    }

    return Promise.reject(error);
  }
);

export default apiClient;
