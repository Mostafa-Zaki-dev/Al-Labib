import React, { useRef, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link, useHistory } from 'react-router-dom';
import { Button, Typography, TextField } from '@material-ui/core';

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
    }
    setLoading(false);
  }

  return (
    <div className="centerme">
      <div className="logo">Al-Labib Logo</div>
      <div className="formdiv">
        <Typography variant="h2">SIGN IN</Typography>
        {error && <div>{error}</div>}
        <form className="veritcalform" onSubmit={handleSubmit}>
          <TextField type="email" label="Email" ref={emailRef} />
          <TextField type="password" label="Password" ref={passwordRef} />
          <br />
          <br />
          <Button variant="contained" color="primary" type="submit" disabled={loading}>
            Sign In
          </Button>
          <br />
          <br />
        </form>
        <Button variant="outlined" onClick={() => history.push('/')}>
          Back
        </Button>
        <br />
        <br />
        <div>
          Need an account? <Link to="/signup">Sign Up</Link>
        </div>
      </div>
    </div>
  );
}
