import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  SwipeableDrawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
  Divider,
  makeStyles,
  Typography,
  Box,
} from '@material-ui/core';
import AvatarIcon from '@material-ui/icons/AccountCircle';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PersonIcon from '@material-ui/icons/Person';
import InfoIcon from '@material-ui/icons/Info';
import HelpIcon from '@material-ui/icons/Help';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import MenuIcon from '@material-ui/icons/Menu';
import theme from '../contexts/Theme';
import { useAuth } from '../contexts/AuthContext';
import { useUser } from '../contexts/UserContext';
import Profile from './Profile';
import Guide from './Guide';

const useStyles = makeStyles({
  DrawerList: {
    minWidth: 250,
  },
  Avatar: {
    margin: theme.spacing(2),
  },
});

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const classes = useStyles();
  const { signout, currentUser } = useAuth();
  const { dbUser } = useUser();
  const history = useHistory();
  const [profileShow, setProfileShow] = useState(false);
  const [guideShow, setGuideShow] = useState(false);

  return (
    <React.Fragment>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={() => setOpen(true)}>
            <MenuIcon />
          </IconButton>
          <SwipeableDrawer
            anchor="left"
            open={open}
            onClose={() => setOpen(false)}
            onOpen={() => {}}
          >
            <div className={classes.DrawerList}>
              <Box textAlign="center">
                {dbUser && currentUser && dbUser.pictureURL ? (
                  <Avatar
                    className={classes.Avatar}
                    alt="google account photo"
                    src={dbUser.pictureURL}
                  />
                ) : (
                  <Avatar className={classes.Avatar}>
                    <AvatarIcon color="primary" fontSize="large" />
                  </Avatar>
                )}
                {dbUser && currentUser ? (
                  <Typography variant="h5" color="primary">
                    Hi, {dbUser.firstName}
                  </Typography>
                ) : (
                  ''
                )}
              </Box>
              <Divider />
              <List>
                {currentUser && (
                  <ListItem
                    button
                    onClick={() => {
                      history.push('/dashboard');
                      setOpen(false);
                    }}
                  >
                    <ListItemIcon>
                      <DashboardIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText primary="Dashboard" />
                  </ListItem>
                )}
                {currentUser && (
                  <ListItem
                    button
                    onClick={() => {
                      setProfileShow(!profileShow);
                      setOpen(false);
                    }}
                  >
                    <ListItemIcon>
                      <PersonIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText primary="Profile" />
                  </ListItem>
                )}
                <ListItem
                  button
                  onClick={() => {
                    setGuideShow(!guideShow);
                    setOpen(false);
                  }}
                >
                  <ListItemIcon>
                    <HelpIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText primary="Guide" />
                </ListItem>
                <ListItem
                  button
                  onClick={() => {
                    history.push('/about-us');
                    setOpen(false);
                  }}
                >
                  <ListItemIcon>
                    <InfoIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText primary="About Us" />
                </ListItem>
              </List>
              <br />
              <br />
              <br />
              <br />
              <Divider />
              {currentUser && (
                <ListItem
                  button
                  onClick={() => {
                    setOpen(false);
                    signout();
                  }}
                >
                  <ListItemIcon>
                    <ExitToAppIcon />
                  </ListItemIcon>
                  <ListItemText primary="Sign Out" />
                </ListItem>
              )}
            </div>
          </SwipeableDrawer>
        </Toolbar>
      </AppBar>
      <Profile profileShow={profileShow} setProfileShow={setProfileShow} />
      <Guide guideShow={guideShow} setGuideShow={setGuideShow} />
    </React.Fragment>
  );
}
