"use client";

import { createContext, useContext, ReactNode } from "react";

import { JWTPayload } from "jose";

interface UserContextType {
  user: JWTPayload | null;
  loading: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({
  children,
  user,
  loading,
}: {
  children: ReactNode;
  user: JWTPayload | null;
  loading: boolean;
}) {
  return (
    <UserContext.Provider value={{ user, loading }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
