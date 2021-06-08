import React, { useContext, useState, useEffect } from 'react';
import { auth, db } from '../firebase-config';
import { useHistory } from 'react-router-dom';
import firebase from 'firebase/app';

// Create Authentication context
const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext); // useContext Hook returns the value prop of AuthContext.Provider
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const history = useHistory();

  function signin(email, password) {
    // the below function returns a promise
    return auth.signInWithEmailAndPassword(email, password);
  }

  async function signup(email, password, firstName, lastName) {
    // the below function returns a promise
    return auth.createUserWithEmailAndPassword(email, password).then(() => {
      db.collection('Users')
        .doc(auth.currentUser.uid)
        .set({
          firstName: firstName,
          lastName: lastName,
          points: 0,
          checkpoints: 0,
          progress: {
            'Level 1': {
              learn: false,
              practice: false,
              text: false,
            },
            'Level 2': {
              learn: false,
              practice: false,
              text: false,
            },
            'Level 3': {
              learn: false,
              practice: false,
              text: false,
            },
            'Level 4': {
              learn: false,
              practice: false,
              text: false,
            },
            'Level 5': {
              learn: false,
              practice: false,
              text: false,
            },
            'Level 6': {
              learn: false,
              practice: false,
              text: false,
            },
            'Level 7': {
              learn: false,
              practice: false,
              text: false,
            },
            'Level 8': {
              learn: false,
              practice: false,
              text: false,
            },
            'Level 9': {
              learn: false,
              practice: false,
              text: false,
            },
          },
        })
        .catch((error) => {
          console.log('Something went wrong with adding user to firestore:', error);
        });
    });
  }

  async function signout() {
    history.push('/');
    return auth.signOut();
  }

  function updateUserName(firstName, lastName) {
    return db.collection('Users').doc(currentUser.uid).update({
      firstName,
      lastName,
    });
  }

  function updateUserEmail(email) {
    return currentUser.updateEmail(email);
  }

  function updateUserPassword(password) {
    return currentUser.updatePassword(password);
  }

  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email);
  }

  // used for essential user data update (like email and password)
  function reAuthenticate(password) {
    const credentials = firebase.auth.EmailAuthProvider.credential(currentUser.email, password);
    return currentUser.reauthenticateWithCredential(credentials);
  }

  async function googleSignIn() {
    var googleProvider = new firebase.auth.GoogleAuthProvider();
    // auth.signInWithPopup(googleProvider).then((result) => {
    //   console.log('Popup result uid>>>', result.user.uid);
    // });
    // await auth.signInWithRedirect(googleProvider);
    // auth.getRedirectResult()
    auth.signInWithPopup(googleProvider).then((result) => {
      console.log('result>>>', result);
      const { user } = result;
      const nameArr = user.displayName.split(' ');
      const photoURL = user.photoURL;
      console.log('type of photoURL>>', typeof photoURL);
      const firstName = nameArr[0];
      const lastName = nameArr[1];
      db.collection('Users')
        .doc(user.uid)
        .get()
        .then((docRef) => {
          if (!docRef.exists) {
            db.collection('Users')
              .doc(user.uid)
              .set({
                firstName: firstName,
                lastName: lastName,
                pictureURL: photoURL,
                points: 0,
                checkpoints: 0,
                progress: {
                  'Level 1': {
                    learn: false,
                    practice: false,
                    text: false,
                  },
                  'Level 2': {
                    learn: false,
                    practice: false,
                    text: false,
                  },
                  'Level 3': {
                    learn: false,
                    practice: false,
                    text: false,
                  },
                  'Level 4': {
                    learn: false,
                    practice: false,
                    text: false,
                  },
                  'Level 5': {
                    learn: false,
                    practice: false,
                    text: false,
                  },
                  'Level 6': {
                    learn: false,
                    practice: false,
                    text: false,
                  },
                  'Level 7': {
                    learn: false,
                    practice: false,
                    text: false,
                  },
                  'Level 8': {
                    learn: false,
                    practice: false,
                    text: false,
                  },
                  'Level 9': {
                    learn: false,
                    practice: false,
                    text: false,
                  },
                },
              })
              .catch((error) => {
                console.log('Something went wrong with adding user to firestore:', error);
              });
          }
        });
    });
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    // the below is for stop event listener for cleaning up when component unmount
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signup,
    signin,
    signout,
    updateUserName,
    updateUserEmail,
    updateUserPassword,
    resetPassword,
    reAuthenticate,
    googleSignIn,
  };
  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
}
