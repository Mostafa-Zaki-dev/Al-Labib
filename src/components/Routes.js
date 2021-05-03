import React from 'react';
import SignUp from './SignUp';
import SignIn from './SignIn';
import LandingPage from './LandingPage';
import App from '../App';
import { AuthProvider } from '../contexts/AuthContext';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

export default function Routes() {
  return (
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
  );
}
