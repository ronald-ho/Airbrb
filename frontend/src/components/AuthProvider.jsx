import React, { createContext, useState } from 'react';
import { logout } from '../api/auth/logout';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const logIn = () => {
    setIsLoggedIn(true);
  };

  const logOut = async () => {
    await logout();
    setIsLoggedIn(false);
  };

  console.log('current isLoggedIn', isLoggedIn);

  return (
    <AuthContext.Provider value={{ isLoggedIn, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};
