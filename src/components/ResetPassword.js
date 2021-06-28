import React, { useRef, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link, useHistory } from 'react-router-dom';
import { Button, Typography, TextField, FormControl } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';

export default function ResetPassword() {
  const { resetPassword } = useAuth();
  const emailRef = useRef();
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setMessage('');
      setError('');
      setLoading(true);
      await resetPassword(emailRef.current.value);
      setMessage('A password reset link is sent to your inbox!');
    } catch (error) {
      setError(`${error.message}`);
      console.log(error);
    }
    setLoading(false);
  }

  return (
    <>
      <div className="centerme">
        <div className="logo-container">
          <img
            src="/appLogo.png"
            alt="Al-Labib Logo"
            style={{
              height: 150,
              width: 150,
            }}
          />
        </div>
        <br />
        <br />
        <div className="formdiv">
          <Typography variant="h5" color={'primary'} style={{ fontWeight: 'bold' }}>
            RESET PASSWORD
          </Typography>
          <br />
          {error && <Alert severity="error">{error}</Alert>}
          {message && <Alert severity="success">{message}</Alert>}
          <FormControl>
            <TextField type="email" label="Email" inputRef={emailRef} />
            <br />
            <Button type="submit" disabled={loading} onClick={handleSubmit}>
              Send Email
            </Button>
            <Button variant="outlined" onClick={() => history.push('/signin')}>
              Back
            </Button>
          </FormControl>
          <br />
          <div style={{ marginTop: 5 }}>
            Need an account? {'  '}
            <Link to="/signup" style={{ textDecoration: 'none' }}>
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
