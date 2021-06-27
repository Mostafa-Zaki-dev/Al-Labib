import { useRef, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link, useHistory } from 'react-router-dom';
import { Button, Typography, TextField, FormControl } from '@material-ui/core';

export default function SignIn() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signin } = useAuth();
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError('');
      setLoading(true);
      await signin(emailRef.current.value, passwordRef.current.value);
      history.push('/dashboard');
    } catch (error) {
      setError(`${error.message}`);
      console.log(error);
      setLoading(false);
    }
  }

  return (
    <div className="centerme">
      <div className="logo">
        <img
          src="/appLogo.png"
          alt="Al-Labib Logo"
          style={{
            height: 150,
            width: 150,
          }}
        />
      </div>
      <div className="formdiv">
        <Typography variant="h2">SIGN IN</Typography>
        {error && <div>{error}</div>}
        <FormControl>
          <TextField
            required
            type="email"
            label="Email"
            inputRef={emailRef}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSubmit(e);
            }}
          />
          <TextField
            required
            type="password"
            label="Password"
            inputRef={passwordRef}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSubmit(e);
            }}
          />
          <Button type="submit" disabled={loading} onClick={handleSubmit}>
            Sign In
          </Button>
          <Button size="small" variant="outlined" onClick={() => history.push('/')}>
            Back Home
          </Button>
        </FormControl>
        <br />
        <br />
        <Link to="/resetpassword" style={{ textDecoration: 'none' }}>
          Forgot Password?
        </Link>
        <div style={{ marginTop: 5 }}>
          Need an account? {'  '}
          <Link to="/signup" style={{ textDecoration: 'none' }}>
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}
