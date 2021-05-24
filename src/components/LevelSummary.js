import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Typography } from '@material-ui/core';
import GradeIcon from '@material-ui/icons/Grade';

export default function LevelSummary() {
  // document.body.style = "background: #35BAF6;";
  const history = useHistory();

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
