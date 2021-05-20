import { useUser } from '../contexts/UserContext';
import { useHistory } from 'react-router-dom';
import { Dialog, List, ListItem, ListItemText, Button, Typography } from '@material-ui/core';

export default function LevelSummary({ name, show }) {
  const { dbUser } = useUser();
  const history = useHistory();
  let levelsCompleted = 0;

  if (dbUser) {
    let progress = dbUser.progress[name];
    for (let key in progress) {
      if (progress[key] === true) levelsCompleted++;
    }
  }
  return (
    <Dialog open={show}>
      <Typography variant="h2">{name}</Typography>
      <List>
        <ListItem>
          <ListItemText primary="Levels" />
          <ListItemText primary={levelsCompleted + '/3'} />
        </ListItem>
      </List>
      <Button onClick={() => history.push('/app')}>Begin</Button>
    </Dialog>
  );
}
