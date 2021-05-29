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

// use React.memo to improve performance by using memoization approach instead of useContext to avoid unnecessary re-renders

function Level({ name, levelNum }) {
  const classes = useStyles();
  const { dbUser, getDbUser } = useUser();
  const [showModal, setShowModal] = useState(false);
  const n = levelNum - 2;
  let cp;
  let stars;
  let levelsCompleted = 0;
  useEffect(() => {
    return getDbUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // console.log('Level rendered');
  if (dbUser) {
    let progress = dbUser.progress[name];
    for (let key in progress) {
      if (progress[key] === true) levelsCompleted++;
    }
    cp = dbUser.checkpoints;
    stars = dbUser[name];
    // console.log('stars', stars);
    // console.log('cp >>', cp);
  }
  const levelUnlock = cp >= 2 + 3 * n;
  const ratingValue = cp >= 3 * levelNum ? 3 : cp - 3 * (levelNum - 1);
  // const rating = stars ? stars : 0;
  const rating = levelsCompleted ? levelsCompleted : 0;

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

  //  levelNum === 1 ? (
  //   <Grid item xs={6} sm={4} md={2}>
  //     <Rating size="large" value={ratingValue} max={3} readOnly />
  //     <Card className={classes.media} raised onClick={handleClick}>
  //       <CardMedia component="img" image="/levels/1.png" title={name} alt={name} />
  //       <LevelDescription name={name} show={showModal} />
  //     </Card>
  //     <Typography variant="h5" gutterBottom>
  //       {name}
  //     </Typography>
  //   </Grid>
  // ) :
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
