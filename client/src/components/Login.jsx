import React from 'react';
//import './pages_css/Login.css';
//import dotenv from 'dotenv'
//ליבא קובץ סENV כמו שצריך
const URL_API = 'http://localhost:3000'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

function Login({ setConnectionStatus, setUserConnectionInfo }) {
  const handleSubmit = async (event) => {
    // Prevent page reload
    event.preventDefault();

    let userConnectionInfo = {
      userName: document.forms[0].userName.value,
      password: document.forms[0].password.value
    }
    console.log(userConnectionInfo);

    const response = await fetch(`${URL_API}/login/${userConnectionInfo.userName}`, {
      method: "POST",
      body: JSON.stringify({ "password": userConnectionInfo.password }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }).catch((error) => {
      console.log("Error:", error);
    });

    if (response.status === 200) {
      const data = await response.json();
      console.log("successfully connected:", data);
      //go to home page
      setConnectionStatus("connected");
    }
    else if (response.status === 205) {
      console.log("first time entering the password most be changed");
      setUserConnectionInfo(userConnectionInfo);
      setConnectionStatus("newConnection");

    }
    else if (response.status === 400) {
      console.log("Error in server");
    }


  };


  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="userName"
            label="User Name"
            name="userName"
            autoComplete="userName"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          {/* <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          /> */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Log In
          </Button>
          {/* <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
          </Grid> */}
        </Box>
      </Box>
    </Container>
  );
}
export default Login;
