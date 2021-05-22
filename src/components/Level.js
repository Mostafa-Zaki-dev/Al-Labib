import { Grid, Card, CardMedia, Typography, makeStyles } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import { useUser } from '../contexts/UserContext';
import React, { useState } from 'react';
import LevelSummary from './LevelSummary';

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

  if (dbUser) {
    cp = dbUser.checkpoints;
  }
  const levelUnlock = cp >= 2 + 3 * n;

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

  return levelNum === 1 ? (
    <Grid item xs={6} sm={4} md={2}>
      <Rating size="large" value={0} max={3} readOnly />
      <Card className={classes.media} raised onClick={handleClick}>
        <CardMedia component="img" image="/levels/1.png" title={name} alt={name} />
        <LevelSummary name={name} show={showModal} />
      </Card>
      <Typography variant="h5" gutterBottom>
        {name}
      </Typography>
    </Grid>
  ) : (
    <Grid item xs={6} sm={4} md={2}>
      <Rating size="large" value={0} max={3} readOnly />
      <Card className={classes.media} raised onClick={handleClick}>
        <CardMedia
          component="img"
          image={levelUnlock ? `/levels/${levelNum}.png` : '/lockLevel.png'}
          title={name}
          alt={name}
        />
        <LevelSummary name={name} show={showModal} />
      </Card>
      <Typography variant="h5" gutterBottom>
        {name}
      </Typography>
    </Grid>
  );
}

export default Level;
