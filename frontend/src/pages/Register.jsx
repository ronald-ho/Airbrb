import React from 'react';
import register from '../api/auth/register';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Popup from '../components/Popup';

function Register () {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [name, setName] = React.useState('');
  const [error, setError] = React.useState('');
  const [showPopup, setShowPopup] = React.useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setShowPopup(true);
      return;
    }

    try {
      await register(email, password, name);
    } catch (error) {
      setError(error.message);
      setShowPopup(true);
    }
  }

  const handleChange = (setter) => (event) => {
    setter(event.target.value);
  }

  const handleClosePopup = () => {
    setShowPopup(false);
  }

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Name"
              variant="outlined"
              value={name}
              onChange={handleChange(setName)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Email"
              variant="outlined"
              value={email}
              onChange={handleChange(setEmail)}
              inputProps={{ autoComplete: 'email' }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Password"
              type="password"
              variant="outlined"
              value={password}
              onChange={handleChange(setPassword)}
              inputProps={{ autoComplete: 'new-password' }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Confirm Password"
              type="password"
              variant="outlined"
              value={confirmPassword}
              onChange={handleChange(setConfirmPassword)}
              inputProps={{ autoComplete: 'new-password' }}
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Register
            </Button>
          </Grid>
        </Grid>
      </form>
      {showPopup &&
        <Popup
          title="Error"
          body={error}
          primaryButtonText="OK"
          onClose={handleClosePopup}
        />
      }
    </div>
  );
}

export default Register;
