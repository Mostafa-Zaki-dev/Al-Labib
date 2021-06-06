import SignUp from './SignUp';
import SignIn from './SignIn';
import LandingPage from './LandingPage';
import App from '../App';
import { AuthProvider } from '../contexts/AuthContext';
import { UserProvider } from '../contexts/UserContext';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import theme from '../contexts/Theme';
import { makeStyles, ThemeProvider } from '@material-ui/core';
import Navbar from './Navbar';
import Dashboard from './Dashboard';
import TrailApp from './TrialApp';
import LevelSummary from './LevelSummary';
import UpdateProfile from './UpdateProfile';
import GameText from './GameText';

const useStyles = makeStyles((theme) => ({
  offset: theme.mixins.toolbar,
}));

export default function Routes() {
  const classes = useStyles();
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <AuthProvider>
          <UserProvider>
            <Navbar />
            <div className={classes.offset} />
            <Switch>
              <Route exact path="/" component={LandingPage} />
              <Route path="/signup" component={SignUp} />
              <Route path="/signin" component={SignIn} />
              <Route path="/dashboard" component={Dashboard} />
              <Route path="/gameText" component={GameText} />
              <Route path="/app" component={TrailApp} />
              <Route path="/levelsummary" component={LevelSummary} />
              <Route path="/updateprofile" component={UpdateProfile} />
            </Switch>
          </UserProvider>
        </AuthProvider>
      </Router>
    </ThemeProvider>
  );
}
