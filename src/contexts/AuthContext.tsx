import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface User {
  username: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  resetPassword: (email: string) => boolean;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Default admin account
const DEFAULT_ADMIN = {
  username: "admin",
  password: "admin123",
  email: "admin@udmexico.com",
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem("currentUser");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem("currentUser", JSON.stringify(user));
    } else {
      localStorage.removeItem("currentUser");
    }
  }, [user]);

  const login = (username: string, password: string): boolean => {
    // Check against default admin or saved admins
    const savedAdmins = JSON.parse(localStorage.getItem("admins") || "[]");
    const allAdmins = [DEFAULT_ADMIN, ...savedAdmins];

    const admin = allAdmins.find(
      (a) => a.username === username && a.password === password
    );

    if (admin) {
      setUser({
        username: admin.username,
        email: admin.email,
      });
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  const resetPassword = (email: string): boolean => {
    // Simulate password reset - in production, this would send an email
    const savedAdmins = JSON.parse(localStorage.getItem("admins") || "[]");
    const allAdmins = [DEFAULT_ADMIN, ...savedAdmins];

    const admin = allAdmins.find((a) => a.email === email);
    if (admin) {
      // In production, send reset email
      alert(
        `Link reset password telah dikirim ke ${email}.\n\nUntuk demo: username: ${admin.username}, password: ${admin.password}`
      );
      return true;
    }
    return false;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        resetPassword,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
