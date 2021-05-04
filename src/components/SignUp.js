import { useRef, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link, useHistory } from 'react-router-dom';
import { Button, Typography, TextField } from '@material-ui/core';

export default function SignUp() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError('Password do not match');
    }

    try {
      setError('');
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
      history.push('/dashboard');
    } catch (error) {
      setError(`${error.message}`);
      console.log(error);
      setLoading(false);
    }
  }

  return (
    <div className="centerme">
      <div className="logo">Al-Labib Logo</div>
      <div className="formdiv">
        <Typography variant="h2">SIGN UP</Typography>
        {error && <div>{error}</div>}
        <form className="veritcalform" onSubmit={handleSubmit}>
          <TextField required type="email" label="Email" inputRef={emailRef} />
          <br />
          <TextField required type="password" label="Password" inputRef={passwordRef} />
          <br />
          <TextField
            required
            type="password"
            label="Confirm Password"
            inputRef={passwordConfirmRef}
          />
          <br />
          <Button type="submit" disabled={loading}>
            Sign Up
          </Button>
          <br />
        </form>
        <Button variant="outlined" onClick={() => history.push('/')}>
          Back Home
        </Button>
        <br />
        <br />
        <div>
          Already have an account? <Link to="/signin">Sign In</Link>
        </div>
      </div>
    </div>
  );
}
