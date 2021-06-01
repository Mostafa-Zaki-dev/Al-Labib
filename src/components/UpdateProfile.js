import React, { useRef, useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useHistory } from 'react-router-dom';
import { Button, Typography, TextField, Link, FormControl } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { useUser } from '../contexts/UserContext';

export default function UpdateProfile() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const { currentUser, updateUserEmail, updateUserPassword, updateUserName } = useAuth();
  const { dbUser, getDbUser } = useUser();
  const history = useHistory();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getDbUser();
  }, [currentUser, getDbUser]);

  let firstName = '';
  let lastName = '';

  if (dbUser) {
    firstName = dbUser.firstName;
    lastName = dbUser.lastName;
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError('Passwords do not match');
    }
    const promises = [updateUserName(firstNameRef.current.value, lastNameRef.current.value)];
    setLoading(true);
    setError('');

    if (emailRef.current.value !== currentUser.email) {
      promises.push(updateUserEmail(emailRef.current.value));
    }
    if (passwordRef.current.value) {
      promises.push(updateUserPassword(passwordRef.current.value));
    }
    Promise.all(promises)
      .then(() => {
        setLoading(false);
        history.push('/dashboard');
      })
      .catch(() => {
        setLoading(false);
        setError('Failed to update account');
      });
  }

  return (
    currentUser && (
      <>
        <div className="centerme">
          <div className="formdiv">
            <Typography variant="h2">UPDATE</Typography>
            {error && <Alert severity="error">{error}</Alert>}
            <FormControl margin="normal">
              <TextField
                type="text"
                label="First Name"
                inputRef={firstNameRef}
                defaultValue={firstName}
              />
              <TextField
                type="text"
                label="Last Name"
                inputRef={lastNameRef}
                defaultValue={lastName}
              />
              <TextField
                required
                type="email"
                label="Email"
                inputRef={emailRef}
                defaultValue={currentUser.email}
              />
              <TextField
                type="Password"
                label="New Password -if needed-"
                inputRef={passwordRef}
                placeholder="********"
              />
              <TextField
                type="Password"
                label="Confirm Password"
                inputRef={passwordConfirmRef}
                placeholder="********"
              />
              <Link href="/resetpassword">Reset Password</Link>
              <Button type="submit" disabled={loading} onClick={handleSubmit}>
                Update Profile
              </Button>
              <Button variant="outlined" onClick={() => history.push('/dashboard')}>
                Back
              </Button>
            </FormControl>
          </div>
        </div>
      </>
    )
  );
}
