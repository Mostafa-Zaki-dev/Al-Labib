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

  // console.log('UserContext renedered');

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

  async function getDbUser() {
    if (isLoggedIn) {
      const user = await db.collection('Users').doc(isLoggedIn.uid).get();
      const dbUser = user.data();
      setDbUser(dbUser);
      // console.log('dbUser form getDbUser :', dbUser);
      return dbUser;
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
          name: level.name,
        };
      });
      setLevels(levels);
    });
  }

  function updateDbUserPts(pts) {
    db.collection('Users').doc(isLoggedIn.uid).update({ points: pts });
  }

  function updateDbUserCp(cp) {
    db.collection('Users').doc(isLoggedIn.uid).update({ checkpoints: cp });
  }

  function updateDbUserProgress(levelName, difficulty) {
    let progressUpdate = {};
    progressUpdate[`progress.${levelName}.${difficulty}`] = true;
    db.collection('Users').doc(isLoggedIn.uid).update(progressUpdate);
  }
  const value = {
    dbUser,
    setDbUser,
    getDbUser,
    getLevels,
    levels,
    setCurrentLevel,
    currentLevel,
    updateDbUserPts,
    updateDbUserProgress,
    updateDbUserCp,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
