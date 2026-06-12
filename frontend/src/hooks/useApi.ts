/**
 * useApi
 *
 * React hook that provides a typed API request function bound to the
 * current authentication state.
 *
 * It automatically:
 * - attaches the current access token to requests
 * - handles token refresh on 401 responses
 * - retries the failed request after refresh
 * - logs the user out if authentication ultimately fails
 *
 * Depends on useAuth() for auth state (token, refresh, logout).
 *
 * Usage:
 * const { request } = useApi();
 * const data = await request<User>("/api/users");
 */

import { apiFetch } from "../api/apiFetch";
import { useAuth } from "./useAuth";

export function useApi() {
  const { token, refresh, logout } = useAuth();

  const request = async <T>(
    url: string,
    options?: RequestInit
  ): Promise<T> => {
    return apiFetch<T>(url, options, {
      getToken: () => token,
      refresh,
      logout,
    });
  };

  return { request };
}