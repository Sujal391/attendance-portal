import { apiClient, setAuthToken, decodeJwtPayload } from '@/lib/api/client';
import API_ENDPOINTS from '@/lib/api/endpoint';
import { setTokenCookie, removeTokenCookie } from '@/lib/utils/cookies';
import type { RegisterDto, AuthResponse, User } from '@/lib/types';

/**
 * Extract User from a JWT payload.
 * Common claim names are tried so it works with most .NET Identity / custom JWTs.
 */
const extractUserFromToken = (token: string): User | null => {
  const payload = decodeJwtPayload(token);
  if (!payload) return null;

  // .NET often uses full URI claim names; fall back to short names
  const role =
    payload['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] ||
    payload['role'] ||
    payload['Role'] ||
    '';

  const username =
    payload['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'] ||
    payload['unique_name'] ||
    payload['sub'] ||
    payload['username'] ||
    payload['Username'] ||
    '';

  const id =
    payload['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'] ||
    payload['nameid'] ||
    payload['sub'] ||
    payload['id'] ||
    0;

  const name = payload['name'] || payload['Name'] || username;
  const department = payload['department'] || payload['Department'] || undefined;

  return {
    id: typeof id === 'string' ? parseInt(id, 10) || 0 : id,
    username,
    role: role as User['role'],
    name,
    department,
  };
};

export const authService = {
  /**
   * Login user — API returns { token: "ey..." }
   */
  login: async (
    username: string,
    password: string
  ): Promise<{ token: string; user: User | null }> => {
    const response = await apiClient.post<AuthResponse>(
      API_ENDPOINTS.AUTH.LOGIN,
      { username, password }
    );

    const token = response.data.token;
    setAuthToken(token);
    setTokenCookie(token); // persist in cookie for middleware & refresh

    const user = extractUserFromToken(token);
    return { token, user };
  },

  /**
   * Register new user
   */
  register: async (data: RegisterDto): Promise<any> => {
    const response = await apiClient.post(API_ENDPOINTS.AUTH.REGISTER, data);
    return response.data;
  },

  /**
   * Logout user (clear token)
   */
  logout: async (): Promise<void> => {
    setAuthToken(null);
    removeTokenCookie();
  },

  /**
   * Re-hydrate axios header from a persisted token (e.g. from zustand storage).
   * Returns the decoded user so the caller can verify the token is still usable.
   */
  rehydrate: (token: string): User | null => {
    setAuthToken(token);
    return extractUserFromToken(token);
  },
};

export default authService;