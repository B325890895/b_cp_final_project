import React from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import CloseIcon from '@mui/icons-material/Close';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimeField } from '@mui/x-date-pickers/TimeField';


function HourAndDate  ({clientId,setHourDateUpdate})  {
  const URL_API = "http://localhost:3000"; 
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
  function convertTo24HourFormat(time12h) {
    const timeRegex = /^(1[0-2]|0?[1-9]):([0-5][0-9])\s?(AM|PM)$/i;
    if (!timeRegex.test(time12h)) {
      throw new Error("Invalid time format. Please use 'HH:MM AM/PM'");
    }
        const [_, hours, minutes, period] = timeRegex.exec(time12h);
  
    let hours24 = parseInt(hours, 10);
        if (period.toLowerCase() === "pm" && hours24 !== 12) {
      hours24 += 12;
    } else if (period.toLowerCase() === "am" && hours24 === 12) {
      hours24 = 0;
    }
        return `${hours24.toString().padStart(2, '0')}:${minutes}`;
  }

  const handleSubmit = async (event) => {
    // Prevent page reload
    event.preventDefault();

   
    let dayAndHourToUpdate = {
      day: document.forms[0].day.value,
      hour:convertTo24HourFormat( document.forms[0].hour.value),
    };
    console.log(dayAndHourToUpdate);
try{
    const response = await fetch(
      `${URL_API}/user/${clientId}`,
      {
        method: "PUT",
        body: JSON.stringify({ dayAndHourToUpdate }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })

    if (response.status!=200) {
      console.log("Error in server");
    }else{
      const result = await response.json();
      console.log(result)
      setHourDateUpdate(false)
    }
  }catch(error)  {
    console.log("Error:", error);
  }
  };

  function updateButtonHandler(){
    setHourDateUpdate(false)
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
          <Button color="inherit" size="small" onClick={updateButtonHandler}>
            <CloseIcon/>
          </Button>
        <Box component="form" 
         onSubmit={handleSubmit}
         noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="day"
            label="יום"
            name="day"
            autoComplete="day"
            autoFocus
          />
              <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['TimeField']}>
        <TimeField id="hour" label="שעה" />
      </DemoContainer>
    </LocalizationProvider>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, bgcolor: '#aee62d', '&:hover': { bgcolor: '#9ed11d' } }}
            >
            שמור
          </Button>
        </Box>
      </Box>
    </Container>
    </ThemeProvider>

  );
}

export default HourAndDate
