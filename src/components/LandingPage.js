import { useHistory } from 'react-router-dom';
import { Button, Typography } from '@material-ui/core';
import GoogleButton from 'react-google-button';
import { useAuth } from '../contexts/AuthContext';

export default function LandingPage() {
  const history = useHistory();
  const { googleSignIn } = useAuth();
  return (
    <div className="centerme">
      <div className="logo">Al-Labib Logo</div>
      <div className="landingbody">
        <Typography variant="h6">
          Sign Language is a dance with words, <br /> Wanna dance with your beloved ones ?
        </Typography>
        <Button variant="contained" color="primary" onClick={() => history.push('/signin')}>
          Sign In
        </Button>

        <Button variant="outlined" onClick={() => history.push('/signup')}>
          Create Account
        </Button>
        <GoogleButton
          style={{ margin: 'auto', marginTop: 25, borderRadius: 3 }}
          onClick={googleSignIn}
        />
      </div>
    </div>
  );
}
