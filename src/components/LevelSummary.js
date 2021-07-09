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
let updatedTotalPts = 0;

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
    setCurrentLevel,
    defineDifficulty,
    levels,
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
    updatedTotalPts = updatedPts;
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

  function handleReplay() {
    if (difficulty === 'text') {
      history.push('/gameText');
    } else {
      history.push('/app');
    }
  }

  async function handlePlayNext() {
    await setCurrentLevel(levels[currentLevel.name]);
    await defineDifficulty(currentLevel.name);

    if (
      dbUser.progress[currentLevel.name].learn &&
      dbUser.progress[currentLevel.name].practice &&
      !dbUser.progress[currentLevel.name].text
    ) {
      history.push({
        pathname: '/gameText',
      });
    } else {
      history.push('/app');
    }
  }

  const levelComplete =
    dbUser.progress[currentLevel.name].learn &&
    dbUser.progress[currentLevel.name].practice &&
    dbUser.progress[currentLevel.name].text;

  return (
    <div className="centerme">
      <div className="game-summary-container">
        <div>
          <Tada>
            {totalPts === 0 && (
              <Typography
                variant="h4"
                color="secondary"
                style={{ marginBottom: 5, fontWeight: 'bold' }}
              >
                Ghost hand ?!!
              </Typography>
            )}
            {totalPts < maxLevelPts && (
              <Typography
                variant="h2"
                color="secondary"
                style={{ marginBottom: 15, fontWeight: 'bold' }}
              >
                Try Again!
              </Typography>
            )}
            {totalPts === maxLevelPts && (
              <Typography
                variant="h2"
                style={{ color: 'gold', marginBottom: 15, fontWeight: 'bold', fontSize: 55 }}
              >
                Star Gained
              </Typography>
            )}
          </Tada>
          <Typography variant="h4">Game Score</Typography>
          <Typography variant="h4" color="primary">
            {totalPts} / {maxLevelPts}
          </Typography>
          {totalPts === maxLevelPts && (
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
          )}
          <Typography variant="h5">Total Points</Typography>
          <Typography variant="h2" color="primary">
            {/* Changed the below for the sake if the asynchronous delay of showing the updated points in the deployed version
            -although it is working on the localserver normally before updating-
            */}
            {updatedTotalPts}
          </Typography>
          <br />
          {totalPts === maxLevelPts && !levelComplete && (
            <Button onClick={handlePlayNext}>Next</Button>
          )}
          <Button variant="outlined" onClick={handleReplay}>
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
