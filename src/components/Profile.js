import React, { useEffect } from 'react';
import { useUser } from '../contexts/UserContext';
import { useAuth } from '../contexts/AuthContext';
import {
  Dialog,
  DialogTitle,
  Typography,
  makeStyles,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Grow,
} from '@material-ui/core';
import { tada } from 'react-animations';
import styled, { keyframes } from 'styled-components';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles({
  paper: {
    backgroundColor: '#c6e0f5',
  },
});

const Tada = styled.div`
  animation: 900ms ${keyframes`${tada}`};
`;

export default function Profile({ profileShow, setProfileShow }) {
  const { dbUser, getDbUser } = useUser();
  const { currentUser } = useAuth();
  const classes = useStyles();
  const history = useHistory();

  useEffect(() => {
    getDbUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClickAway = () => {
    setProfileShow(false);
  };

  let unlockedLevels = 0;
  let cp = 0;
  let points = 0;

  if (dbUser) {
    cp = dbUser.checkpoints;
    points = dbUser.points;
    if (cp < 2) unlockedLevels = 1;
    if (cp > 1) unlockedLevels = Math.round(cp / 2);
  }

  return (
    <>
      <Dialog
        classes={{ paper: classes.paper }}
        open={profileShow}
        onBackdropClick={handleClickAway}
        closeAfterTransition={true}
        TransitionComponent={Grow}
        transitionDuration={{ enter: 500, exit: 200 }}
      >
        <DialogTitle style={{ color: 'darkblue' }} align="center">
          Hi, {dbUser && currentUser && dbUser.firstName}!
        </DialogTitle>
        <div className="center-modal">
          <Typography variant="h2">STATS</Typography>
          <Typography variant="h5">Unlocked Levels</Typography>
          <Tada>
            <Typography variant="h2" color="primary">
              {`${unlockedLevels} / 9`}
            </Typography>
          </Tada>
          <br />
          <Typography variant="h5">Achieved Stars</Typography>
          <Tada>
            <Typography variant="h2" color="primary">
              {`${cp} / 27`}
            </Typography>
          </Tada>
          <br />
          <Typography variant="h5">Total Points</Typography>
          <Tada>
            <Typography variant="h2" color="primary">
              {points}
            </Typography>
          </Tada>
        </div>
        <List>
          <ListItem
            align="center"
            button
            onClick={() => {
              setProfileShow(false);
              history.push('/updateprofile');
            }}
          >
            <ListItemAvatar style={{ marginLeft: 50 }}>
              <Avatar>
                <PersonOutlineIcon color="secondary" />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Edit Account" />
          </ListItem>
        </List>
      </Dialog>
    </>
  );
}
