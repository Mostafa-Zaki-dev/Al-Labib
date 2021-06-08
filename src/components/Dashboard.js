import { Grid, Typography, Container } from '@material-ui/core';
import Level from './Level';
import { useUser } from '../contexts/UserContext';
import React, { useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

const levels = [1, 2, 3, 4, 5, 6, 7, 8, 9];

function Dashboard() {
  const { dbUser, getDbUser, getLevels, updateDbUserCp } = useUser();
  const { createGoogleDbUser } = useAuth();

  console.log('<<rendered>>');

  useEffect(() => {
    if (!dbUser) {
      createGoogleDbUser();
    }
    (async () => {
      await updateDbUserCp();
      await getDbUser();
      getLevels();
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container className="centerme" style={{ marginTop: 20 }}>
      <Typography variant="h3"> Get to Learn</Typography>
      <Grid container spacing={3}>
        {levels.map((level) => (
          <Level key={level} dbUser={dbUser} name={`Level ${level}`} levelNum={level}></Level>
        ))}
      </Grid>
    </Container>
  );
}

export default Dashboard;
