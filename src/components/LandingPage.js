import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Typography } from '@material-ui/core';

export default function LandingPage() {
  const history = useHistory();
  return (
    <div className="centerme">
      <div className="logo">Al-Labib Logo</div>
      <Typography variant="h6">
        Sign Language is a dance with words, wanna dance with your beloved ones ?
      </Typography>
      <br />
      <Button variant="contained" color="primary" onClick={() => history.push('/signin')}>
        Sign In
      </Button>
      <br />
      <br />
      <Button variant="outlined" onClick={() => history.push('/signup')}>
        Create Account
      </Button>
    </div>
  );
}
