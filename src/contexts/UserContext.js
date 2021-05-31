import React, { useContext, useState, useEffect } from 'react';
import { db } from '../firebase-config';
import { useAuth } from '../contexts/AuthContext';

const UserContext = React.createContext();

export function useUser() {
  return useContext(UserContext);
}

export function UserProvider({ children }) {
  const [dbUser, setDbUser] = useState(null);
  // const isLoggedIn = auth.currentUser; // changed to currentUser from AuthContext to be rendered in Navbar
  const { currentUser } = useAuth();
  const isLoggedIn = currentUser;
  const [levels, setLevels] = useState({});
  const [currentLevel, setCurrentLevel] = useState({});
  const [difficulty, setDifficulty] = useState(null);

  useEffect(() => {
    if (isLoggedIn) {
      const userRef = db.collection('Users').doc(isLoggedIn.uid);
      (async () => {
        let user = await userRef.get();
        if (user.exists) {
          setDbUser(user.data());
        }
      })();
    } else {
      setDbUser(null);
    }
  }, [isLoggedIn]);

  async function getDbUser() {
    if (isLoggedIn) {
      const user = await db.collection('Users').doc(isLoggedIn.uid).get();
      /* 
      the below approach is beacause while creating/updating a field in the user document, 
      the firestore consider the document DO NOT exist untill the create/update async process is completed 
      According to : https://stackoverflow.com/questions/48068581/firebase-doc-exists-but-doc-exists-returns-false
      */
      if (user.exists) {
        setDbUser(user.data());
      } else if (!user.exists) {
        getDbUser();
      }
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

  async function updateDbUserCp() {
    const user = await db.collection('Users').doc(isLoggedIn.uid).get();
    if (user.exists) {
      const dbUser = user.data();
      let progress = dbUser.progress;
      let cp = 0;
      for (let level in progress) {
        // the below if condition is to avoid the updateDbUserProgress Error
        if (level !== 'undefined') {
          for (let key in progress[level]) {
            if (progress[level][key] === true) {
              cp++;
            }
          }
        }
      }
      db.collection('Users').doc(isLoggedIn.uid).update({ checkpoints: cp });
    } else if (!user.exists) {
      updateDbUserCp();
    }
  }

  function updateDbUserProgress(levelName, difficulty) {
    // when LevelSummary is refreshed levelName is undefined as currentLevel state is back to the intial state useState({})

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
