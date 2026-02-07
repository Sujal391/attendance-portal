import axios from 'axios';
import {
  requestInterceptor,
  requestErrorInterceptor,
  responseInterceptor,
  responseErrorInterceptor,
} from './interceptors';

// Create axios instance
export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  // withCredentials NOT needed for Bearer token authentication
  // Only needed for cookie-based authentication
});

// Add request interceptors
apiClient.interceptors.request.use(requestInterceptor, requestErrorInterceptor);

// Add response interceptors
apiClient.interceptors.response.use(
  responseInterceptor,
  responseErrorInterceptor
);

// Helper function to set auth token in session (memory only)
let authToken: string | null = null;

export const setAuthToken = (token: string | null) => {
  authToken = token;
  
  if (token) {
    apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete apiClient.defaults.headers.common['Authorization'];
  }
};

// Helper function to get current auth token from memory
export const getAuthToken = (): string | null => {
  return authToken;
};

// Helper function to check if user is authenticated
export const isAuthenticated = (): boolean => {
  return authToken !== null;
};

/**
 * Decode JWT payload without verification (server already verified).
 * Returns the parsed payload object, or null if decoding fails.
 */
export const decodeJwtPayload = (token: string): Record<string, any> | null => {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    // Base64url → Base64 → decode
    const base64 = parts[1].replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch {
    return null;
  }
};

export default apiClient;