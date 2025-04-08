// src/contexts/AuthContext.tsx
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import axios from "axios";

interface AuthContextType {
  user: string | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem("token"));
  const [user, setUser] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      if (!token) {
        setUser(null);
        return;
      }

      try {
        const res = await axios.get("http://localhost:5000/api/users/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUser(res.data.email);
      } catch (err) {
        console.error("Erreur récupération utilisateur :", err);
        logout(); // Token invalide → déconnexion
      }
    };

    fetchUser();
  }, [token]);

  const login = async (email: string, password: string) => {
    const res = await axios.post("http://localhost:5000/api/auth", { email, password });
    const token = res.data.data;
    localStorage.setItem("token", token);
    setToken(token);
  };

  const signup = async (email: string, password: string) => {
    await axios.post("http://localhost:5000/api/users", { email, password });
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
