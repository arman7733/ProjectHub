import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { api } from "@/lib/api";

interface User {
  id: string;
  email: string;
  name: string;
  role: "Admin" | "Manager" | "Developer" | "Tester";
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (
    email: string,
    password: string,
    name: string,
    role: string
  ) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        console.log("Loaded user from localStorage:", parsedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error("Error parsing user from localStorage:", error);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
      }
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await api.post("/auth/login", { email, password });
      console.log("Login response:", response.data);

      // Handle .NET Core response structure
      const backendData = response.data.result || response.data;
      const token = response.data.token || backendData.token;

      // Transform backend data to frontend User structure
      const userData: User = {
        id: backendData.id,
        email: backendData.email,
        name: backendData.name,
        role: Array.isArray(backendData.roles)
          ? backendData.roles[0]
          : backendData.role,
      };

      console.log("User data transformed:", userData);

      if (token) {
        localStorage.setItem("token", token);
      }
      localStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);
    } catch (error) {
      console.error("Login error:", error);
      throw new Error("Invalid credentials");
    }
  };

  const register = async (
    email: string,
    password: string,
    name: string,
    role: string
  ) => {
    try {
      const response = await api.post("/auth/register", {
        email,
        password,
        name,
        role,
      });
      console.log("Register response:", response.data);

      // Handle .NET Core response structure
      const backendData = response.data.result || response.data;
      const token = response.data.token || backendData.token;

      // Transform backend data to frontend User structure
      const userData: User = {
        id: backendData.id,
        email: backendData.email,
        name: backendData.name,
        role: Array.isArray(backendData.roles)
          ? backendData.roles[0]
          : backendData.role,
      };

      console.log("User data transformed:", userData);

      if (token) {
        localStorage.setItem("token", token);
      }
      localStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);
    } catch (error) {
      console.error("Registration error:", error);
      throw new Error("Registration failed");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, login, register, logout, isAuthenticated: !!user }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
