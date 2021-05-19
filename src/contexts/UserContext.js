import React, { useContext, useState, useEffect } from 'react';
import { db } from '../firebase-config';
import { useAuth } from '../contexts/AuthContext';

const UserContext = React.createContext();

export function useUser() {
  return useContext(UserContext);
}

export function UserProvider({ children }) {
  const [dbUser, setDbUser] = useState(null);
  // const isLoggedIn = auth.currentUser;  // changed to currentUser from AuthContext to be rendered in Navbar
  const { currentUser } = useAuth();
  const isLoggedIn = currentUser;

  useEffect(() => {
    if (isLoggedIn) {
      const userRef = db.collection('Users').doc(isLoggedIn.uid);
      (async () => {
        let user = await userRef.get();
        setDbUser(user.data());
      })();
    } else {
      setDbUser(null);
    }
  }, [isLoggedIn]);

  function getDbUser() {
    if (isLoggedIn) {
      db.collection('Users')
        .doc(isLoggedIn.uid)
        .get()
        .then((user) => {
          setDbUser(user.data());
        });
    }
  }

  const value = {
    dbUser,
    getDbUser,
    setDbUser,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
