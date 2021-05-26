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
    return () => (ReactStrictModeCompensateCounter = 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (dbUser) {
    ReactStrictModeCompensateCounter++;
    let dbPoints = dbUser.points;
    console.log('dbPoints', dbPoints);
    let updatedPts = totalPts + dbPoints;
    console.log('updatedPts', updatedPts);
    // To avoid updating points twice which cause multiplying user points by 2 each round
    if (ReactStrictModeCompensateCounter < 2) {
      console.log('<<<<   excuted >>>');
      updateDbUserPts(updatedPts);
    }

    if (totalPts >= maxLevelPts) {
      updateDbUserProgress(currentLevel.name, difficulty);
      updateDbUserCp();
    }
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
