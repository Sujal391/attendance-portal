const COOKIE_NAME = 'auth-token';

/**
 * Set a cookie (client-side).
 * Uses SameSite=Lax and path=/ so it's sent on every navigation
 * and readable by Next.js middleware.
 */
export const setTokenCookie = (token: string) => {
  if (typeof document === 'undefined') return;
  // 7-day expiry — adjust as needed
  const maxAge = 7 * 24 * 60 * 60;
  document.cookie = `${COOKIE_NAME}=${encodeURIComponent(token)}; path=/; max-age=${maxAge}; SameSite=Lax`;
};

/**
 * Read the auth token cookie (client-side).
 */
export const getTokenCookie = (): string | null => {
  if (typeof document === 'undefined') return null;
  const match = document.cookie.match(
    new RegExp('(?:^|; )' + COOKIE_NAME + '=([^;]*)')
  );
  return match ? decodeURIComponent(match[1]) : null;
};

/**
 * Remove the auth token cookie (client-side).
 */
export const removeTokenCookie = () => {
  if (typeof document === 'undefined') return;
  document.cookie = `${COOKIE_NAME}=; path=/; max-age=0; SameSite=Lax`;
};

/** The cookie name — exported so middleware can read it by the same key. */
export const AUTH_COOKIE_NAME = COOKIE_NAME;

