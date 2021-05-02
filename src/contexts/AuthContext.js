import React, { useContext, useState, useEffect } from 'react';
import { auth } from '../firebase-config';

// Create Authentication context
const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext); // useContext Hook returns the value prop of AuthContext.Provider
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  function signin(email, password) {
    // the below function returns a promise
    return auth.signInWithEmailAndPassword(email, password);
  }

  function signup(email, password) {
    // the below function returns a promise
    return auth.createUserWithEmailAndPassword(email, password);
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe; //not necessary but will leave it for now
  }, []);

  const value = {
    currentUser,
    signup,
    signin,
  };
  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
}
