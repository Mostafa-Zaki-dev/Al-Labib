import SignUp from './SignUp';
import SignIn from './SignIn';
import LandingPage from './LandingPage';
import { AuthProvider } from '../contexts/AuthContext';
import { UserProvider } from '../contexts/UserContext';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import theme from '../contexts/Theme';
import { makeStyles, ThemeProvider } from '@material-ui/core';
import Navbar from './Navbar';
import Dashboard from './Dashboard';
import TrailApp from './TrialApp';
import LevelSummary from './LevelSummary';
import UpdateProfile from './UpdateProfile';
import GameText from './GameText';
import React, { useState, useEffect } from 'react';
import { auth } from '../firebase-config';
import ResetPassword from './ResetPassword';

const useStyles = makeStyles((theme) => ({
  offset: theme.mixins.toolbar,
}));

export default function Routes() {
  const classes = useStyles();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // for accessing app dashboard and better user experience dealing with react route
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) setIsLoggedIn(true);
      else setIsLoggedIn(false);
    });
  });

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <AuthProvider>
          <UserProvider>
            <Navbar />
            <div className={classes.offset} />
            <Switch>
              <Route exact path="/">
                {isLoggedIn ? <Redirect to="/dashboard" /> : <LandingPage />}
              </Route>
              <Route path="/signup" component={SignUp} />
              <Route path="/signin" component={SignIn} />
              <Route path="/dashboard">{isLoggedIn ? <Dashboard /> : <Redirect to="/" />}</Route>
              <Route path="/gameText" component={GameText} />
              <Route path="/app" component={TrailApp} />
              <Route path="/levelsummary" component={LevelSummary} />
              <Route path="/updateprofile" component={UpdateProfile} />
              <Route path="/resetpassword" component={ResetPassword} />
            </Switch>
          </UserProvider>
        </AuthProvider>
      </Router>
    </ThemeProvider>
  );
}
