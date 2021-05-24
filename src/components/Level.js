import { Grid, Card, CardMedia, Typography, makeStyles } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import { useUser } from '../contexts/UserContext';
import React, { useState, useEffect } from 'react';
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

  console.log('Level rendered');
  if (dbUser) {
    cp = dbUser.checkpoints;
    // console.log('cp >>', cp);
  }
  const levelUnlock = cp >= 2 + 3 * n;
  const ratingValue = cp >= 3 * levelNum ? 3 : cp - 3 * (levelNum - 1);
  // console.log('ratingValue', ratingValue);
  // console.log('levelNum', levelNum);
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
      <Rating size="large" value={ratingValue} max={3} readOnly />
      <Card className={classes.media} raised onClick={handleClick}>
        <CardMedia component="img" image="/levels/1.png" title={name} alt={name} />
        <LevelDescription name={name} show={showModal} />
      </Card>
      <Typography variant="h5" gutterBottom>
        {name}
      </Typography>
    </Grid>
  ) : (
    <Grid item xs={6} sm={4} md={2}>
      <Rating size="large" value={ratingValue} max={3} readOnly />
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
