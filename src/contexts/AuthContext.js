import React, { useContext, useState, useEffect } from 'react';
import { auth, db } from '../firebase-config';
import { useHistory } from 'react-router-dom';

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
    return auth
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
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
      })
      .catch((error) => {
        console.log('Something went wrong with sign up:', error);
      });
  }

  async function signout() {
    history.push('/');
    return auth.signOut();
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      console.log('authChanged user >>>', user);
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe; //not necessary but will leave it for now
  }, []);

  const value = {
    currentUser,
    signup,
    signin,
    signout,
  };
  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
}
