import { Grid, Typography, Container } from '@material-ui/core';
import Level from './Level';
import { useUser } from '../contexts/UserContext';
import React, { useEffect } from 'react';

const levels = [1, 2, 3, 4, 5, 6, 7, 8, 9];

function Dashboard() {
  const { getDbUser } = useUser();
  // console.log('dbUser Dashboard', dbUser);
  // console.log('dashboard rendered >>');

  useEffect(() => {
    getDbUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container className="centerme" style={{ marginTop: 20 }}>
      <Typography variant="h3"> Get to Learn</Typography>
      <Grid container spacing={3}>
        {levels.map((level) => (
          <Level key={level} name={`Level ${level}`} levelNum={level}></Level>
        ))}
      </Grid>
    </Container>
  );
}

export default Dashboard;
