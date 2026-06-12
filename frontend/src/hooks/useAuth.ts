/**
 * useAuth
 *
 * React hook that provides access to the authentication context.
 *
 * It exposes the current auth state and actions such as:
 * - access token
 * - login
 * - logout
 * - refresh token
 *
 * Must be used within an AuthProvider, otherwise it will throw an error.
 */

import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export function useAuth() {
  const auth = useContext(AuthContext);

  if (!auth) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return auth;
}