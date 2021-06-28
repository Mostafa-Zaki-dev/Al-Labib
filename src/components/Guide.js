import { Dialog, List, Typography } from '@material-ui/core';

export default function Guide({ guideShow, setGuideShow }) {
  const handleClickAway = () => {
    setGuideShow(false);
  };

  return (
    <Dialog open={guideShow} onBackdropClick={handleClickAway}>
      <Typography variant="h2" color="secondary" align="center" style={{ fontWeight: 'bold' }}>
        GUIDE
      </Typography>
      <List align="center">
        <Typography variant="h5" color="primary">
          GET STARTED
        </Typography>
        <Typography variant="h6" style={{ fontSize: 16 }}>
          Learn Arabic Sign Language alphabet through the first star of each level.
        </Typography>
        <br />
        <Typography variant="h5" color="primary">
          PRACTICE
        </Typography>
        <Typography variant="h6" style={{ fontSize: 16 }}>
          Each level has 3 stars.
        </Typography>

        <Typography variant="h6" style={{ fontSize: 16 }}>
          First star is for learning, The following stars is for practicing.
        </Typography>
        <Typography variant="h6" style={{ fontSize: 16 }}>
          Once all level stars are completed, you can repeat any star again later on your request.
        </Typography>
        <Typography variant="h6" style={{ fontSize: 16 }}>
          Gaining more stars will unlock next levels.
        </Typography>
        <br />
        <Typography variant="h5" style={{ fontSize: 13 }}>
          Good Luck, Enjoy dancing with words &#128521;.
        </Typography>
      </List>
    </Dialog>
  );
}
