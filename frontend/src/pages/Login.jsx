import React from 'react';
import login from '../api/auth/login';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Popup from '../components/Popup';

function Login () {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');
  const [showPopup, setShowPopup] = React.useState(false);

  const handleSubmit = async () => {
    try {
      await login(email, password);
      localStorage.setItem('email', email);
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
      <h1>Login</h1>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Email"
            variant="outlined"
            value={email}
            onChange={handleChange(setEmail)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Password"
            variant="outlined"
            type="password"
            value={password}
            onChange={handleChange(setPassword)}
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Login
          </Button>
        </Grid>
      </Grid>
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

export default Login;
