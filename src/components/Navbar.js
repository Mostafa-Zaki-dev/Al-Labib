import React, { useState, useRef } from 'react';
import {
  AppBar,
  Toolbar,
  SwipeableDrawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Avatar,
  Divider,
  makeStyles,
} from '@material-ui/core';
import AvatarIcon from '@material-ui/icons/AccountCircle';
import MenuIcon from '@material-ui/icons/Menu';
import theme from '../contexts/Theme';

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
  const nodeRef = useRef(null);
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
            <div className={classes.DrawerList} ref={nodeRef}>
              <Avatar className={classes.Avatar}>
                <AvatarIcon color="secondary" fontSize="large" />
              </Avatar>
              <Divider />
              <List>
                <ListItem button onClick={() => {}}>
                  <ListItemText primary="Profile" />
                </ListItem>
              </List>
            </div>
          </SwipeableDrawer>
        </Toolbar>
      </AppBar>
      <Toolbar /> {/* rendering another Toolbar to prevent content behind Navbar */}
    </React.Fragment>
  );
}
