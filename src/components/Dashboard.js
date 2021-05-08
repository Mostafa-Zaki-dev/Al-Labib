import { Grid, Card, CardMedia, Typography, Container, makeStyles } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';

const levels = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const useStyles = makeStyles({
  media: {
    padding: 15,
    margin: 5,
  },
});
function Dashboard() {
  const classes = useStyles();
  return (
    <Container className="centerme" style={{ marginTop: 20 }}>
      <Typography variant="h3"> Get to Learn</Typography>
      <Grid container spacing={3}>
        {levels.map((level) => (
          <Grid item key={level} xs={6} sm={4} md={2}>
            <Rating size="large" value={0} max={1} readOnly />
            <Card className={classes.media} raised>
              <CardMedia
                component="img"
                image="/lockLevel.png"
                title={`Level ${level}`}
                alt={`Level ${level}`}
              />
            </Card>
            <Typography variant="h5" gutterBottom>
              Level {level}
            </Typography>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default Dashboard;

/* sections [ابتث , جحخ , دذ , رز , سشصض , طظ عغ, فقكل منهوي] */
