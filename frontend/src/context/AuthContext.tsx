import { createContext, useState, ReactNode, useRef } from "react";
import { getRequest } from "../utils/fetch";

type AuthContextType = {
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
  refresh: () => Promise<string>;
  getToken: () => string | null;
};

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Create the actual context object.
export const AuthContext = createContext<AuthContextType | null>(null);

// This component wraps entire app and provides it with auth state
export function AuthProvider({ children }: { children: ReactNode }) {

  // JWT state, anytime this state changes, React re-renders all components that use it.
  const [token, setToken] = useState<string | null>(null);

  // Used for api calls, to ensure token is not stale
  const tokenRef = useRef<string | null>(null);

  // Assign new JWT
  const login = (jwt: string) => {
    setToken(jwt);
    tokenRef.current = jwt;
  };

  const logout = async () => {
    setToken(null);
    tokenRef.current = null;
  };

  const getToken = () => tokenRef.current;
  

  const refresh = async (): Promise<string> => {
  /**
   * Generate a new access token using the refresh token
   * 
   * The refresh token is stored in an HttpOnly cookie,
   * so it's automatically sent with `credentials: "include"`.
   */
    const res = await fetch(`${BASE_URL}/auth/refresh`, {
      method: "POST",
      credentials: "include", // send refresh token cookie
    });

    if (!res.ok) {
      throw new Error("RefreshFailed");
    }

    const data = await res.json();

    // Update access token in context
    setToken(data.accessToken);
    tokenRef.current = data.accessToken;

    return data.accessToken;
  };


  return (
    // Provider makes the token, login, and logout functions
    // available to ANY component inside your app that calls useContext(AuthContext).
    <AuthContext.Provider value={{ token, login, logout, refresh, getToken}}>
      {/* Render the rest of the app */}
      {children}  
    </AuthContext.Provider>
  );
}
