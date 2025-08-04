import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import axios from "@/lib/axios";

interface AuthContextType {
  isAuthenticated: boolean;
  setIsAuthenticated: (val: boolean) => void;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
  authChecked: boolean;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  setIsAuthenticated: () => {},
  logout: async () => {},
  checkAuth: async () => {},
  authChecked: false,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);

  const checkAuth = useCallback(async () => {
    try {
      await axios.get("api/user/me", { withCredentials: true });
      setIsAuthenticated(true);
    } catch {
      console.error("Auth check failed:");
      setIsAuthenticated(false);
    } finally {
      setAuthChecked(true);
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await axios.get("api/user/logout", { withCredentials: true });
      setIsAuthenticated(false);
    } catch (err) {
      console.error("Logout error:", err);
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, logout, checkAuth, authChecked }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
