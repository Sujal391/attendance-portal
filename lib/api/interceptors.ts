import { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { message } from 'antd';

// Request interceptor
export const requestInterceptor = (config: InternalAxiosRequestConfig) => {
  // You can add request logging or modifications here if needed
  return config;
};

// Request error interceptor
export const requestErrorInterceptor = (error: AxiosError) => {
  return Promise.reject(error);
};

// Response interceptor
export const responseInterceptor = (response: AxiosResponse) => {
  return response;
};

// Response error interceptor
export const responseErrorInterceptor = (error: AxiosError) => {
  if (error.response) {
    const { status, data } = error.response;

    switch (status) {
      case 401:
        // Session expired - redirect to login
        message.error('Session expired. Please login again.');
        if (typeof window !== 'undefined') {
          window.location.href = '/login';
        }
        break;

      case 403:
        // Forbidden - face mismatch or unauthorized
        message.error(
          (data as any)?.message || 'Access forbidden. Face verification failed or unauthorized action.'
        );
        break;

      case 404:
        message.error('Resource not found.');
        break;

      case 500:
        message.error('Server error. Please try again later.');
        break;

      default:
        message.error(
          (data as any)?.message || 'An error occurred. Please try again.'
        );
    }
  } else if (error.request) {
    // Network error
    message.error('Network error. Please check your connection.');
  } else {
    message.error('An unexpected error occurred.');
  }

  return Promise.reject(error);
};