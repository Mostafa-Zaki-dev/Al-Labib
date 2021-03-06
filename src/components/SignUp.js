import { useRef, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link, useHistory } from 'react-router-dom';
import { Button, Typography, TextField, FormControl } from '@material-ui/core';

export default function SignUp() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError('Passwords do not match');
    }

    try {
      setError('');
      setLoading(true);
      await signup(
        emailRef.current.value,
        passwordRef.current.value,
        firstNameRef.current.value,
        lastNameRef.current.value
      );
      history.push('/dashboard');
    } catch (error) {
      setError(`${error.message}`);
      console.log(error);
      setLoading(false);
    }
  }

  return (
    <div className="centerme">
      <div className="formdiv">
        <Typography variant="h3" style={{ fontWeight: 'bold' }} color={'primary'}>
          SIGN UP
        </Typography>
        {error && <div>{error}</div>}
        <FormControl>
          <TextField
            required
            type="text"
            label="First Name"
            inputRef={firstNameRef}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSubmit(e);
            }}
          />
          <TextField
            required
            type="text"
            label="Last Name"
            inputRef={lastNameRef}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSubmit(e);
            }}
          />
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
          <TextField
            required
            type="password"
            label="Confirm Password"
            inputRef={passwordConfirmRef}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSubmit(e);
            }}
          />
          <Button type="submit" disabled={loading} onClick={handleSubmit}>
            Sign Up
          </Button>
          <Button variant="outlined" onClick={() => history.push('/')}>
            Back Home
          </Button>
        </FormControl>
        <br />
        <br />
        <div>
          Already have an account?{' '}
          <Link to="/signin" style={{ textDecoration: 'none' }}>
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
