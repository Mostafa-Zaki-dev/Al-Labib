import { useHistory } from 'react-router-dom';
import { Button, Typography } from '@material-ui/core';
import GoogleButton from 'react-google-button';
import { useAuth } from '../contexts/AuthContext';

export default function LandingPage() {
  const history = useHistory();
  const { googleSignIn } = useAuth();
  return (
    <div className="centerme">
      <div className="logo">
        <img
          src="/appLogo.png"
          alt="Al-Labib Logo"
          style={{
            height: 190,
            width: 190,
          }}
        />
      </div>
      <div className="landingbody">
        <Typography variant="h6">Sign Language is a dance with words,</Typography>
        <Typography variant="h6" style={{ fontSize: 15 }}>
          Wanna dance with your beloved ones &#128521;?
        </Typography>
        <GoogleButton
          style={{ margin: 'auto', marginTop: 25, borderRadius: 3 }}
          onClick={googleSignIn}
        />
        <br />
        <Button variant="contained" color="primary" onClick={() => history.push('/signin')}>
          Sign In
        </Button>

        <Button variant="outlined" onClick={() => history.push('/signup')}>
          Create Account
        </Button>
      </div>
    </div>
  );
}
