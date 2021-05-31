import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Typography } from '@material-ui/core';
import GradeIcon from '@material-ui/icons/Grade';
import { useUser } from '../contexts/UserContext';

// To avoid the result of the rendering twice of the StrictMode
let ReactStrictModeCompensateCounter = 0;

export default function LevelSummary(props) {
  const { totalPts, maxLevelPts } = props.location.state;
  const history = useHistory();
  const {
    dbUser,
    getDbUser,
    updateDbUserProgress,
    updateDbUserPts,
    currentLevel,
    difficulty,
    updateDbUserCp,
  } = useUser();

  useEffect(() => {
    getDbUser();
    // (async () => await getDbUser())();
    return () => (ReactStrictModeCompensateCounter = 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    return getDbUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  console.log('dbUser LevelSummary:: ', dbUser);
  // console.log('currentLevel', currentLevel);

  // console.log('updateDbUserCp excuted');
  // let cp = 0;
  // if (dbUser) {
  //   // console.log('updateDbUserCp if(dbUser) excuted');
  //   // const user = await db.collection('Users').doc(isLoggedIn.uid).get();
  //   // const dbUser = user.data();
  //   let progress = dbUser.progress;
  //   for (let level in progress) {
  //     for (let key in progress[level]) {
  //       if (progress[level][key] === true) {
  //         cp++;
  //       }
  //     }
  //   }
  // }

  const gameResults = async () => {
    ReactStrictModeCompensateCounter++;
    let dbPoints = dbUser.points;
    // console.log('dbPoints', dbPoints);
    let updatedPts = totalPts + dbPoints;
    // console.log('updatedPts', updatedPts);
    // To avoid updating points twice which cause multiplying user points by 2 each round
    await updateDbUserPts(updatedPts);
    if (totalPts >= maxLevelPts) {
      await updateDbUserProgress(currentLevel.name, difficulty);
      await updateDbUserCp();
    }
  };

  if (ReactStrictModeCompensateCounter < 2) {
    // console.log('<<<<   excuted >>>');
    dbUser && gameResults();
    // getDbUser();
    // getDbUser();
  }

  return (
    <div className="centerme">
      <div className="game-summary-container">
        <div>
          <Typography variant="h2">Level Summary</Typography>
          <Typography>Total Points</Typography>
          <GradeIcon color="primary" style={{ fontSize: 100 }}></GradeIcon>
          <br />
          {/* <Button onClick={() => history.push('/')}>Next</Button> */}
          <Button variant="outlined" onClick={() => history.push('/app')}>
            Play Again
          </Button>
          <Button variant="outlined" onClick={() => history.push('/dashboard')}>
            Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
}
