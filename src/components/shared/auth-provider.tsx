"use client";

import { createContext, useContext, type ReactNode } from "react";
import { type User as FirebaseUser } from "firebase/auth";
import { useAuth } from "@/hooks/use-auth";

interface AuthContextValue {
  user: FirebaseUser | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextValue>({
  user: null,
  loading: true,
});

export const useAuthContext = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const authState = useAuth();
  return (
    <AuthContext.Provider value={authState}>{children}</AuthContext.Provider>
  );
};
