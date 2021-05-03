import React from 'react';
import SignUp from './SignUp';
import SignIn from './SignIn';
import LandingPage from './LandingPage';
import App from '../App';
import { AuthProvider } from '../contexts/AuthContext';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import theme from '../contexts/Theme';
import { ThemeProvider } from '@material-ui/core';

export default function Routes() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <AuthProvider>
          <Switch>
            <Route exact path="/" component={LandingPage} />
            <Route path="/signup" component={SignUp} />
            <Route path="/signin" component={SignIn} />
            <Route path="/app" component={App} />
          </Switch>
        </AuthProvider>
      </Router>
    </ThemeProvider>
  );
}
