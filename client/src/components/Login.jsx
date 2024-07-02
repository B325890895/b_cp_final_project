import React from "react";
//import './pages_css/Login.css';
//import dotenv from 'dotenv'
// import dotenv from "dotenv"
// dotenv.config({path:'../../.env'});
// const URL_API = process.env.REACT_APP_URL;
import { useNavigate } from "react-router-dom";
const URL_API = "http://localhost:3000";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from '@mui/material/styles';


function Login({ setConnectionStatus, setUserState }) {
  const navigate = useNavigate();

  const theme = createTheme({
    palette: {
      primary: {
        main: "#576911",
      },
      secondary: {
        main: "#ff9b2c",
      },
    },
  });
  const handleSubmit = async (event) => {
    // Prevent page reload
    event.preventDefault();

    let userConnectionInfo = {
      userName: document.forms[0].userName.value,
      password: document.forms[0].password.value,
    };
    console.log(userConnectionInfo);

    const response = await fetch(
      `${URL_API}/password/${userConnectionInfo.userName}`,
      {
        method: "POST",
        body: JSON.stringify({ password: userConnectionInfo.password }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }
    ).catch((error) => {
      console.log("Error:", error);
    });

    if (response.status === 200) {
      const data = await response.json();
      console.log("successfully connected:", data);
      setUserState(data.userState);
      setUserId(userConnectionInfo.userName)
      localStorage.setItem('userState', data.userState);
      localStorage.setItem('userId', userConnectionInfo.userName);
      navigate("/Home");
    }
    // else if (response.status === 400) {
    else {
      console.log("Error in server");
    }
  };

  function singUp() {
    setConnectionStatus("newConnection");
  }
  return (
    <ThemeProvider theme={theme}>

    <Container component="main" maxWidth="xs" dir="rtl">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          התחברות
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="userName"
            label="שם משתמש"
            name="userName"
            autoComplete="userName"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="סיסמא"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          {/* <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          /> */}
          <Grid item xs>
            <Link href="#" variant="body2" onClick={singUp}>
              כניסה ראשונה למערכת? לחץ כאן
            </Link>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, bgcolor: '#aee62d', '&:hover': { bgcolor: '#9ed11d' } }}
            >
            התחבר
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                שכחת סיסמא?
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
    </ThemeProvider>

  );
}
export default Login;
