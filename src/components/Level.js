import { Grid, Card, CardMedia, Typography, makeStyles } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import { useUser } from '../contexts/UserContext';

const useStyles = makeStyles({
  media: {
    padding: 15,
    margin: 5,
  },
});
function Level(props) {
  const { name, levelNum } = props;
  const n = levelNum - 2;
  const classes = useStyles();
  const { dbUser } = useUser();
  let cp;

  if (dbUser) {
    cp = dbUser.checkpoints;
  }

  return levelNum === 1 ? (
    <Grid item xs={6} sm={4} md={2}>
      <Rating size="large" value={0} max={3} readOnly />
      <Card className={classes.media} raised>
        <CardMedia component="img" image="/levels/1.png" title={name} alt={name} />
      </Card>
      <Typography variant="h5" gutterBottom>
        {name}
      </Typography>
    </Grid>
  ) : (
    <Grid item xs={6} sm={4} md={2}>
      <Rating size="large" value={0} max={3} readOnly />
      <Card className={classes.media} raised>
        <CardMedia
          component="img"
          image={cp >= 2 + 3 * n ? `/levels/${levelNum}.png` : '/lockLevel.png'}
          title={name}
          alt={name}
        />
      </Card>
      <Typography variant="h5" gutterBottom>
        {name}
      </Typography>
    </Grid>
  );
}

export default Level;
