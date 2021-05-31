import { Grid, Card, CardMedia, Typography, makeStyles } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import { useUser } from '../contexts/UserContext';
import React, { useState } from 'react';
import LevelDescription from './LevelDescription';

const useStyles = makeStyles({
  media: {
    padding: 15,
    margin: 5,
  },
});

function Level({ name, levelNum }) {
  const classes = useStyles();
  const { dbUser } = useUser();
  const [showModal, setShowModal] = useState(false);
  const n = levelNum - 2;
  let cp;
  let levelsCompleted = 0;

  if (dbUser) {
    let progress = dbUser.progress[name];
    for (let key in progress) {
      if (progress[key] === true) levelsCompleted++;
    }
    cp = dbUser.checkpoints;
  }
  const levelUnlock = cp >= 2 + 3 * n;
  const rating = levelsCompleted ? levelsCompleted : 0;

  const handleClick = (e) => {
    e.preventDefault();
    if (levelNum === 1) {
      setShowModal(!showModal);
    } else if (levelUnlock) {
      setShowModal(!showModal);
    } else {
      setShowModal(false);
    }
  };

  return (
    <Grid item xs={6} sm={4} md={2}>
      <Rating size="large" value={rating} max={3} readOnly />
      <Card className={classes.media} raised onClick={handleClick}>
        <CardMedia
          component="img"
          image={levelUnlock ? `/levels/${levelNum}.png` : '/lockLevel.png'}
          title={name}
          alt={name}
        />
        <LevelDescription name={name} show={showModal} />
      </Card>
      <Typography variant="h5" gutterBottom>
        {name}
      </Typography>
    </Grid>
  );
}

export default Level;
