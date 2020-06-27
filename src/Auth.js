import React, { useState, useContext, useEffect } from 'react';
import { auth } from './Database/Firebase';

const AuthContext = React.createContext();

export const AuthStatus = {
  Loading: 'Loading',
  SignedIn: 'SignedIn',
  SignedOut: 'SignedOut',
};

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    user: null,
    status: AuthStatus.Loading,
  });
  useEffect(
    () =>
      auth.onAuthStateChanged(user => {
        setAuthState({
          user,
          status: user ? AuthStatus.SignedIn : AuthStatus.SignedOut,
        });
      }),
    []
  );
  return <AuthContext.Provider value={authState} children={children} />;
};

export const useAuthState = () => useContext(AuthContext);
