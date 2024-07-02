import React,{useState} from "react";
import { useNavigate } from "react-router-dom";

//import dotenv from 'dotenv'
//ליבא קובץ סENV כמו שצריך
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
import Alert from '@mui/material/Alert';
import { createTheme, ThemeProvider } from '@mui/material/styles';


function Login({ setConnectionStatus, setUserState }) {

  const theme = createTheme({
    palette: {
      primary: {
        main: '#576911',
      },
      secondary: {
        main: '#ff9b2c', 
      },
    },
  });
  const navigate = useNavigate();
  const [passwordAlert,setPasswordAlert] =useState(false);
  const handleSubmit = async (event) => {
    // Prevent page reload
    event.preventDefault();
  
    let userConnectionInfo = {
      userName: document.forms[0].userName.value,
      password: document.forms[0].password.value,
      newPassword: document.forms[0].newPassword.value,
      validationNewPassword: document.forms[0].validationNewPassword.value
    };
    console.log(userConnectionInfo);
    if(userConnectionInfo.newPassword!=userConnectionInfo.validationNewPassword) {
      setPasswordAlert(true)
      return;
    }
try {
    const response = await fetch(
      `${URL_API}/temporaryPassword/${userConnectionInfo.userName}`,
      {
        method: "POST",
        body: JSON.stringify({
          password: userConnectionInfo.password,
          newPassword: userConnectionInfo.newPassword,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }
    ).catch((error) => {
      console.log("Error:", error);
    });
    
    if (response.status == 200) {
      const data = await response.json();
      console.log("successfully connected:", data);
      setUserState(data.userState);
      setUserId(userConnectionInfo.userName)
      localStorage.setItem('userId', userConnectionInfo.userName);
      localStorage.setItem('userState', data.userState);
      if(data.userState=="manager"){
        navigate("/Home");
      }else{
        navigate("/createProfile");
      }
    }
    else {
      console.log("Error in server");
    }
  }catch (e) {
    console.log(e);
  }
  };
  function logIn() {
    setConnectionStatus("notConnected");
  }
  function closeAlert(){
    setPasswordAlert(false);
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
          כניסה ראשונית למערכת
        </Typography>
        {passwordAlert && (<Alert variant="outlined" severity="error" onClose={closeAlert} dir="rtl" sx={{width:"100%"}}>
      סימאות לא תואמות
     </Alert>)}
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
            label="סיסמא שהתקבלה במערכת"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="newPassword"
            label="סיסמא חדשה"
            type="password"
            id="newPassword"
            autoComplete="current-password"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="validationNewPassword"
            label="אימות סיסמא חדשה"
            type="password"
            id="validationNewPassword"
            autoComplete="current-password"
          />
          <Grid item xs>
            <Link href="#" variant="body2" onClick={logIn}>
              כבר נכנסת בעבר למערכת? לחץ כאן{" "}
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
        </Box>
      </Box>
    </Container>
    </ThemeProvider>

  );
}
export default Login;
