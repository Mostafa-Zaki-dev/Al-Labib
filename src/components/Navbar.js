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
import SettingsIcon from '@material-ui/icons/Settings';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import MenuIcon from '@material-ui/icons/Menu';
import theme from '../contexts/Theme';
import { useAuth } from '../contexts/AuthContext';
import { useUser } from '../contexts/UserContext';

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
                <Avatar className={classes.Avatar}>
                  <AvatarIcon color="secondary" fontSize="large" />
                </Avatar>
                {dbUser && currentUser ? (
                  <Typography variant="h5">Hi, {dbUser.firstName}</Typography>
                ) : (
                  ''
                )}
              </Box>
              <Divider />
              <List>
                <ListItem
                  button
                  onClick={() => {
                    history.push('/dashboard');
                    setOpen(false);
                  }}
                >
                  <ListItemIcon>
                    <DashboardIcon />
                  </ListItemIcon>
                  <ListItemText primary="Dashboard" />
                </ListItem>
                <ListItem button onClick={() => {}}>
                  <ListItemIcon>
                    <PersonIcon />
                  </ListItemIcon>
                  <ListItemText primary="Profile" />
                </ListItem>
                <ListItem button onClick={() => {}}>
                  <ListItemIcon>
                    <InfoIcon />
                  </ListItemIcon>
                  <ListItemText primary="About Us" />
                </ListItem>
                <br />
                <ListItem button onClick={() => {}}>
                  <ListItemIcon>
                    <SettingsIcon />
                  </ListItemIcon>
                  <ListItemText primary="Settings" />
                </ListItem>
              </List>
              <br />
              <br />
              <br />
              <br />
              <Divider />
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
            </div>
          </SwipeableDrawer>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}
