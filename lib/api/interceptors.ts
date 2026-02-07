import { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { message } from 'antd';
import { getTokenCookie, removeTokenCookie } from '@/lib/utils/cookies';

// Configure message to appear in top-right corner
message.config({
  top: 24,
  duration: 3,
  maxCount: 3,
  prefixCls: 'ant-message',
});

// Request interceptor
export const requestInterceptor = (config: InternalAxiosRequestConfig) => {
  // If in-memory token was lost (e.g. page refresh), fall back to the cookie
  if (!config.headers['Authorization']) {
    const cookieToken = getTokenCookie();
    if (cookieToken) {
      config.headers['Authorization'] = `Bearer ${cookieToken}`;
    }
  }
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
        // Unauthorized — clear cookie and redirect; the login page handles the rest
        removeTokenCookie();
        message.error({
          content: 'Session expired or unauthorized. Please login again.',
          key: 'auth-error',
        });
        if (typeof window !== 'undefined') {
          setTimeout(() => {
            window.location.href = '/login';
          }, 1000);
        }
        break;

      case 403:
        // Forbidden - face mismatch or unauthorized action
        message.error({
          content: (data as any)?.message || 'Access forbidden. Face verification failed or unauthorized action.',
          key: 'forbidden-error',
        });
        break;

      case 404:
        message.error({
          content: (data as any)?.message || 'Resource not found.',
          key: 'not-found-error',
        });
        break;

      case 400:
        // Bad request - validation errors
        message.error({
          content: (data as any)?.message || 'Invalid request. Please check your input.',
          key: 'validation-error',
        });
        break;

      case 500:
        message.error({
          content: 'Server error. Please try again later.',
          key: 'server-error',
        });
        break;

      default:
        message.error({
          content: (data as any)?.message || 'An error occurred. Please try again.',
          key: 'default-error',
        });
    }
  } else if (error.request) {
    // Network error
    message.error({
      content: 'Network error. Please check your connection.',
      key: 'network-error',
    });
  } else {
    message.error({
      content: 'An unexpected error occurred.',
      key: 'unexpected-error',
    });
  }

  return Promise.reject(error);
};