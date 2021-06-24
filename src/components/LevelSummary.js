import React, { useEffect } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import { Button, Typography } from '@material-ui/core';
import GradeIcon from '@material-ui/icons/Grade';
import { useUser } from '../contexts/UserContext';
import { tada } from 'react-animations';
import styled, { keyframes } from 'styled-components';

const Tada = styled.div`
  animation: 900ms ${keyframes`${tada}`};
`;

// To avoid the result of the rendering twice of the StrictMode
let ReactStrictModeCompensateCounter = 0;

export default function LevelSummary(props) {
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
    return () => {
      ReactStrictModeCompensateCounter = 0;
      getDbUser();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // to avoid direct access of URL leading to no props value
  if (props.location.state === undefined) {
    return <Redirect to="/dashboard" />;
  }
  const { totalPts, maxLevelPts } = props.location.state;

  // to avoid page reloading/refreshing leading to currentLevel={} -its initial state-
  if (currentLevel.name === undefined) {
    return <Redirect to="/dashboard" />;
  }

  const gameResults = async () => {
    ReactStrictModeCompensateCounter++;
    let dbPoints = dbUser.points;
    let updatedPts = totalPts + dbPoints;
    await updateDbUserPts(updatedPts);
    if (totalPts === maxLevelPts) {
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
          <Typography variant="h4">Game Score</Typography>
          <Tada>
            <div
              style={{
                position: 'relative',
                display: 'flex',
                textAlign: 'center',
                justifyContent: 'center',
              }}
            >
              <Typography
                variant="h2"
                style={{
                  fontWeight: 'bold',
                  fontSize: 35,
                  textAlign: 'center',
                  color: 'white',
                  position: 'absolute',
                  top: '32%',
                  marginRight: 1,
                }}
              >
                {totalPts}
              </Typography>
              <GradeIcon color="primary" style={{ fontSize: 110, fill: 'gold' }}></GradeIcon>
            </div>
          </Tada>
          <Typography variant="h5">Total Points</Typography>
          <Typography variant="h2" color="primary">
            {dbUser.points}
          </Typography>
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
