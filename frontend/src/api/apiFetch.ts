/**
 * Generic authenticated fetch wrapper with automatic refresh-token handling.
 *
 * This function:
 * 1. Sends a request with the current access token
 * 2. If the request fails with 401 (Unauthorized), it attempts to refresh the token
 * 3. Retries the original request once using the new token
 * 4. Logs the user out if the retry also fails with 401
 *
 * It is designed to be framework-agnostic (no React dependency) and is typically
 * used by React hooks such as `useApi`.
 */

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function apiFetch<T>(
  url: string,
  options: RequestInit | undefined,
  auth: {
    getToken: () => string | null;
    refresh: () => Promise<string>;
    logout: () => void;
  }
): Promise<T> {
  // Shared in-flight refresh promise to prevent multiple simultaneous refresh calls
  let refreshPromise: Promise<string> | null = null;

  /**
   * Ensures only one refresh request is active at a time.
   * Other requests will wait for the same refresh promise.
   */
  const refreshToken = async () => {
    if (!refreshPromise) {
      refreshPromise = auth.refresh().finally(() => {
        refreshPromise = null;
      });
    }
    return refreshPromise;
  };

  /**
   * Performs the actual HTTP request with an optional access token.
   */
  const makeRequest = (token: string | null) =>
    fetch((BASE_URL + url), {
      ...options,
      credentials: "include",
      headers: {
        ...options?.headers,
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    });

  // 1. Initial request with current access token
  let res = await makeRequest(auth.getToken());

  // If request succeeds or fails for a non-auth reason, return response
  if (res.status !== 401) return (await res.json()) as T;

  // 2. Attempt to refresh token after 401
  const newToken = await refreshToken();

  // 3. Retry original request with refreshed token
  res = await makeRequest(newToken);

  // 4. If still unauthorized, log user out and fail
  if (res.status === 401) {
    auth.logout();
    throw new Error("Unauthorized");
  }

  return (await res.json()) as T;
}