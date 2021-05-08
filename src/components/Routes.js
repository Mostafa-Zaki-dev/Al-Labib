import SignUp from './SignUp';
import SignIn from './SignIn';
import LandingPage from './LandingPage';
import App from '../App';
import { AuthProvider } from '../contexts/AuthContext';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import theme from '../contexts/Theme';
import { makeStyles, ThemeProvider } from '@material-ui/core';
import Navbar from './Navbar';
import Dashboard from './Dashboard';

const useStyles = makeStyles((theme) => ({
  offset: theme.mixins.toolbar,
}));

export default function Routes() {
  const classes = useStyles();
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <AuthProvider>
          <Navbar />
          <div className={classes.offset} />
          <Switch>
            <Route exact path="/" component={LandingPage} />
            <Route path="/signup" component={SignUp} />
            <Route path="/signin" component={SignIn} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/app" component={App} />
          </Switch>
        </AuthProvider>
      </Router>
    </ThemeProvider>
  );
}
