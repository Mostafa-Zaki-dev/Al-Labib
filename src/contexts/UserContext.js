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
  const [levels, setLevels] = useState({});
  const [currentLevel, setCurrentLevel] = useState({});

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

  function getLevels() {
    const levelsRef = db.collection('Levels');
    const levels = {};
    levelsRef.get().then((snapshot) => {
      snapshot.docs.forEach((doc) => {
        const level = doc.data();
        levels[level.name] = {
          detect: level.detect,
          promptArr: level.promptArr,
        };
      });
      setLevels(levels);
    });
  }

  const value = {
    dbUser,
    setDbUser,
    getDbUser,
    getLevels,
    levels,
    setCurrentLevel,
    currentLevel,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
