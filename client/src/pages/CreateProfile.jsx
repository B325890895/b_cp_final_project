import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from '@mui/material/styles';

import "./pages_css/CreateProfile.css";

function CreateProfile({userState}) {
  const theme = createTheme({
    palette: {
      primary: {
        main: '#576911',
      },
      secondary: {
        main: '#ff9b2c',       },
      },
    });
    const [hmo, setHmo] = useState("");
    const [birthDate, setBirthDate] = useState();
    const navigate = useNavigate();
    const URL_API = "http://localhost:3000";
    
    switch (userState) {
      case "client":
        break;
      case "manager":
        navigate("/*");
        break;
      default:
        navigate("/*");
        break;
    }
    const handleHmoChange = (event) => {
    setHmo(event.target.value);
  };
  // const handleBirthDateChange = (name,newValue) => {
  //   console.log(newValue);
  //   // setBirthDate();
  // };
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("hi i will now submit");
    let userProfile = {
      user_id: document.forms[0].user_id.value,
      userName: document.forms[0].user_name.value,
      HMO: hmo,
      // birthDate: birthDate,
      email: document.forms[0].user_email.value,
      father: {
        name: document.forms[0].father_name.value,
        phoneNumber: document.forms[0].father_phoneNumber.value,
      },
      mother: {
        name: document.forms[0].mother_name.value,
        phoneNumber: document.forms[0].mother_phoneNumber.value,
      },
    };
    console.log(userProfile);
    try {
      const response = await fetch(`${URL_API}/user`, {
        method: "POST",
        body: JSON.stringify(userProfile),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      if (response.ok) {
        const data = await response.json();
        console.log("Successfully created user:", data);
        navigate("/Home");
      } else {
        console.log("Error in server");
      }
    } catch (err) {
      console.log(err.message);
    }
  };
  return (
    <ThemeProvider theme={theme}>

    <Container component="main" maxWidth="lg" dir="rtl">
      <CssBaseline />
      <Box className="form-container">
        <Box className="headers">
          <Typography component="h1" variant="h3">
            ברוכים הבאים לאתר
          </Typography>
          <Typography component="h1" variant="h5">
            רק כמה פרטים אישיים ואנחנו מוכנים
          </Typography>
        </Box>
        
        <Box component="form" onSubmit={handleSubmit} noValidate
         className="form-content"
         >
                  <Box className="form-fields">
          <Box className="left-side">
          <Box id="profile">
            <TextField
              required
              fullWidth
              autoFocus
              margin="normal"
              name="user_id"
              id="user_id"
              label="מספר זהות"
            />

            <TextField
              margin="normal"
              required
              fullWidth
              id="user_name"
              label="שם מלא"
              name="user_name"
              autoFocus
            />

            <TextField
              margin="normal"
              required
              fullWidth
              id="user_email"
              label="כתובת מייל"
              name="user_email"
              autoFocus
            />
            <InputLabel id="hmoLabel">קופת חולים</InputLabel>
            <Select
              labelId="hmoLabel"
              id="hmo"
              // value={hmo}
              onChange={handleHmoChange}
              label="קופת חולים"
              fullWidth
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={1}>מאוחדת</MenuItem>
              <MenuItem value={2}>כללית</MenuItem>
              <MenuItem value={3}>לאומית</MenuItem>
              <MenuItem value={4}>מכבי</MenuItem>
            </Select>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                autoFocus
                fullWidth
                margin="normal"
                inputFormat="DD-MM-YYYY"
                label="תאריך לידה"
                id="birth_date"
                // onChange={handleBirthDateChange}
              />
            </LocalizationProvider>
          </Box>
          </Box>
          
          <Box className="right-side">
            <Box id="father">
              <Typography component="h1" variant="h6">
                פרטי אב
              </Typography>
              <TextField
              margin="normal"
              required
              fullWidth
              id="father_name"
              label="שם מלא"
              name="father_name"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="father_phoneNumber"
              label="מספר טלפון"
              name="father_phoneNumber"
              autoFocus
            />            </Box>
            <Box id="mother">
              <Typography component="h1" variant="h6">
                פרטי אם
              </Typography>
              <TextField
              margin="normal"
              required
              fullWidth
              id="mother_name"
              label="שם מלא"
              name="mother_name"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="mother_phoneNumber"
              label="מספר טלפון"
              name="mother_phoneNumber"
              autoFocus
            />            </Box>
          </Box>
          </Box>
        <Box className="submit-button">
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, bgcolor: '#aee62d', '&:hover': { bgcolor: '#9ed11d' } }}
            >
            שמירת פרטים
          </Button>
        </Box>
        
        </Box>
      </Box>
    </Container>
    </ThemeProvider>

  )

}

export default CreateProfile;
