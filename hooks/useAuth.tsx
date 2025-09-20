import React, { createContext, ReactNode, useContext } from "react";

type Props = {
  children: ReactNode;
};

type AuthContextType = {
  user: string | null;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
});

export const AuthProvider = ({ children }: Props) => {
  return (
    <AuthContext.Provider value={{ user: null }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
