import React from 'react'

const HourAndDate = () => {
  // const handleSubmit = async (event) => {
  //   // Prevent page reload
  //   event.preventDefault();

  //   let userConnectionInfo = {
  //     userName: document.forms[0].userName.value,
  //     password: document.forms[0].password.value,
  //   };
  //   console.log(userConnectionInfo);

  //   const response = await fetch(
  //     `${URL_API}/password/${userConnectionInfo.userName}`,
  //     {
  //       method: "PUT",
  //       body: JSON.stringify({ password: userConnectionInfo.password }),
  //       headers: {
  //         "Content-type": "application/json; charset=UTF-8",
  //       },
  //     }
  //   ).catch((error) => {
  //     console.log("Error:", error);
  //   });

  //   if (response.status === 200) {
  //     const data = await response.json();
  //     console.log("successfully connected:", data);
  //     setUserState(data.userState);
  //     navigate("/Home");
  //   }
  //   // else if (response.status === 400) {
  //   else {
  //     console.log("Error in server");
  //   }
  // };
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
            id="day"
            label="יום"
            name="day"
            autoComplete="day"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="hour"
            label="שעה"
            id="hour"
            autoComplete="hour"
          />
          {/* <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          /> */}
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
