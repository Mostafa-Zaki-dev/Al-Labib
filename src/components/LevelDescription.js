import { useUser } from '../contexts/UserContext';
import { useHistory } from 'react-router-dom';
import { Dialog, List, Button, Typography, Grow } from '@material-ui/core';

const letters = {
  'Level 1': 'أ ب ت ث',
  'Level 2': 'ج ح خ',
  'Level 3': 'د ذ',
  'Level 4': 'ر ز',
  'Level 5': 'س ش ص ض',
  'Level 6': 'ط ظ',
  'Level 7': 'ع غ',
  'Level 8': 'ف ق ك ل',
  'Level 9': 'م ن ه و ي',
};

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
      if (selectedStar === 'text') {
        history.push('/gameText');
        return;
      } else {
        history.push('/app');
      }
    } else {
      await defineDifficulty(name);
      if (
        dbUser.progress[name].learn &&
        dbUser.progress[name].practice &&
        !dbUser.progress[name].text
      ) {
        history.push('/gameText');
      } else {
        history.push('/app');
      }
    }
  }

  return levelsCompleted !== 3 ? (
    <Dialog open={show} TransitionComponent={Grow} transitionDuration={{ enter: 600, exit: 200 }}>
      <Typography variant="h3" style={{ fontWeight: 'bold' }} color="primary" align="center">
        {name}
      </Typography>
      <Typography
        variant="h4"
        style={{ fontWeight: 'bold', fontSize: 20 }}
        color="secondary"
        align="center"
      >
        {letters[name]}
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
    <Dialog open={show} TransitionComponent={Grow} transitionDuration={{ enter: 600, exit: 200 }}>
      <Typography variant="h3" style={{ fontWeight: 'bold' }} color="primary" align="center">
        {name}
      </Typography>
      <Typography
        variant="h4"
        style={{ fontWeight: 'bold', fontSize: 20 }}
        color="secondary"
        align="center"
      >
        {letters[name]}
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
        <Typography variant="h5" color="primary" style={{ fontWeight: 'bold' }}>
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
