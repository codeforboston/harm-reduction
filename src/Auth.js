import React, { useState, useContext, useEffect } from 'react';
import { auth } from './Firebase';

const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({ user: null, isSignedIn: false });
  useEffect(
    () =>
      auth.onAuthStateChanged(user =>
        setAuthState({ user, isSignedIn: !!user })
      ),
    []
  );
  return (
    <AuthContext.Provider value={authState}>{children}</AuthContext.Provider>
  );
};

export const useAuthState = () => useContext(AuthContext);
