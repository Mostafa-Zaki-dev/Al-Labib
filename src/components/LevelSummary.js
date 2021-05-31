import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Typography } from '@material-ui/core';
import GradeIcon from '@material-ui/icons/Grade';
import { useUser } from '../contexts/UserContext';

// To avoid the result of the rendering twice of the StrictMode
let ReactStrictModeCompensateCounter = 0;

export default function LevelSummary(props) {
  const history = useHistory();
  // to avoid direct access of URL leading to no props value
  if (props.location.state === undefined) {
    history.push('/dashboard');
    window.location.reload();
  }
  const { totalPts, maxLevelPts } = props.location.state;
  const {
    dbUser,
    getDbUser,
    updateDbUserProgress,
    updateDbUserPts,
    currentLevel,
    difficulty,
    updateDbUserCp,
  } = useUser();

  // to avoid page reloading/refreshing leading to currentLevel={} -its initial state
  if (currentLevel.name === undefined) {
    history.push('/dashboard');
    window.location.reload();
  }
  useEffect(() => {
    getDbUser();
    return () => {
      ReactStrictModeCompensateCounter = 0;
      getDbUser();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const gameResults = async () => {
    ReactStrictModeCompensateCounter++;
    let dbPoints = dbUser.points;
    let updatedPts = totalPts + dbPoints;
    await updateDbUserPts(updatedPts);
    if (totalPts >= maxLevelPts) {
      await updateDbUserProgress(currentLevel.name, difficulty);
      await updateDbUserCp();
    }
  };

  // To avoid updating points twice which cause multiplying user points by 2 each round
  if (ReactStrictModeCompensateCounter < 2) {
    dbUser && gameResults();
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
