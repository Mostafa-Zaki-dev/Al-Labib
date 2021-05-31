import { useUser } from '../contexts/UserContext';
import { useHistory } from 'react-router-dom';
import { Dialog, List, Button, Typography } from '@material-ui/core';

export default function LevelDescription({ name, show }) {
  const { dbUser, levels, setCurrentLevel, defineDifficulty, setDifficulty } = useUser();
  const history = useHistory();
  let levelsCompleted = 0;

  if (dbUser) {
    let progress = dbUser.progress[name];
    for (let key in progress) {
      if (progress[key] === true) levelsCompleted++;
    }
  }

  // const handleButtonClick = (chosenLevel) => (e) => {
  // 	e.preventDefault();
  // 	setDifficulty(chosenLevel);
  // 	handleClick(chosenLevel);
  // };

  async function handleClick(selectedStar) {
    await setCurrentLevel(levels[name]);
    if (selectedStar !== undefined) {
      await setDifficulty(selectedStar);
      history.push('/app');
      return;
    } else {
      await defineDifficulty(name);
      history.push('/app');
    }
  }

  return levelsCompleted !== 3 ? (
    <Dialog open={show}>
      <Typography variant="h3" style={{ fontWeight: 'bold' }} color="primary" align="center">
        {name}
      </Typography>
      <List align="center">
        <Typography variant="h4" style={{ color: 'gold', fontWeight: 'bold' }}>
          Stars
        </Typography>
        <Typography
          variant="h1"
          color="primary"
          style={{ color: 'gold', fontWeight: 'bolder' }}
        >{` ${levelsCompleted} / 3`}</Typography>
        {levelsCompleted === 0 && (
          <Typography variant="h6" color="primary">
            The first level is for learning, Later you will test your memory.
          </Typography>
        )}
      </List>
      <Button onClick={() => handleClick()}>Begin</Button>
    </Dialog>
  ) : (
    <Dialog open={show}>
      <Typography variant="h3" style={{ fontWeight: 'bold' }} color="primary" align="center">
        {name}
      </Typography>
      <List align="center">
        <Typography variant="h4" style={{ color: 'gold', fontWeight: 'bold' }}>
          Achieved Stars
        </Typography>
        <br />
        <Typography
          variant="h2"
          color="primary"
          style={{ color: 'gold', fontWeight: 'bolder' }}
        >{` ${levelsCompleted} / 3`}</Typography>
        <br />
        <Typography variant="h5" color="primary">
          LEVEL COMPLETED
        </Typography>
        <br />
        <Typography variant="h6" color="primary">
          Select which star you want to achieve again
        </Typography>
        <Button onClick={() => handleClick('learn')}>Star I</Button>
        <Button onClick={() => handleClick('practice')}>Star II</Button>
        <Button onClick={() => handleClick('text')}>Star III</Button>
      </List>
    </Dialog>
  );
}
