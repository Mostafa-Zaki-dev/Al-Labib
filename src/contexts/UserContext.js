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
  const [difficulty, setDifficulty] = useState(null);

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
    // getLevels();
  }, [isLoggedIn]);

  async function getDbUser() {
    // console.log('getDbUser excuted');
    if (isLoggedIn) {
      const user = await db.collection('Users').doc(isLoggedIn.uid).get();
      const dbUser = user.data();
      setDbUser(dbUser);
      // console.log('dbUser form getDbUser :', dbUser);
      return dbUser;
    }
  }

  // Imediate invokede fn because levels is not changed
  function getLevels() {
    // console.log('getlevels excuted');
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

  function updateDbUserCp() {
    let cp = 0;
    if (dbUser) {
      let progress = dbUser.progress;
      for (let level in progress) {
        for (let key in progress[level]) if (progress[level][key] === true) cp++;
      }
    }
    // let cp = {
    //   'Level 1': 0,
    //   'Level 2': 0,
    //   'Level 3': 0,
    //   'Level 4': 0,
    //   'Level 5': 0,
    //   'Level 6': 0,
    //   'Level 7': 0,
    //   'Level 8': 0,
    //   'Level 9': 0,
    //   total: 0,
    // };
    // if (dbUser) {
    //   let progress = dbUser.progress;
    //   for (let level in progress) {
    //     if (!progress[level].learn && !progress[level].practice && !progress[level].text) {
    //       cp[level] = 0;
    //     } else if (progress[level].learn && !progress[level].practice && !progress[level].text) {
    //       cp[level] = 1;
    //     } else if (progress[level].learn && progress[level].practice && !progress[level].text) {
    //       cp[level] = 2;
    //     } else if (progress[level].learn && progress[level].practice && progress[level].text) {
    //       cp[level] = 3;
    //     }
    //     cp.total += cp[level];
    //   }
    // }
    db.collection('Users').doc(isLoggedIn.uid).update({ checkpoints: cp });
  }

  function updateDbUserProgress(levelName, difficulty) {
    let progressUpdate = {};
    progressUpdate[`progress.${levelName}.${difficulty}`] = true;
    db.collection('Users').doc(isLoggedIn.uid).update(progressUpdate);
  }

  const defineDifficulty = (currentLevelName) => {
    if (
      !dbUser.progress[currentLevelName].learn &&
      !dbUser.progress[currentLevelName].practice &&
      !dbUser.progress[currentLevelName].text
    ) {
      setDifficulty('learn');
    } else if (
      dbUser.progress[currentLevelName].learn &&
      !dbUser.progress[currentLevelName].practice &&
      !dbUser.progress[currentLevelName].text
    ) {
      setDifficulty('practice');
    } else if (
      dbUser.progress[currentLevelName].learn &&
      dbUser.progress[currentLevelName].practice &&
      !dbUser.progress[currentLevelName].text
    ) {
      setDifficulty('text');
    }
  };
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
    defineDifficulty,
    setDifficulty,
    difficulty,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
