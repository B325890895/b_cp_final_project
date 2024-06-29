import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDatePicker } from "@mui/x-date-pickers";
import EmailIcon from "@mui/icons-material/Email";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import PersonIcon from "@mui/icons-material/Person";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import HMobiledataIcon from "@mui/icons-material/HMobiledata";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";

import "./pages_css/CreateProfile.css";

function CreateProfile() {
  const [hmo, setHmo] = useState("");
  const [birthDate, setBirthDate] = useState();
  const navigate = useNavigate();
  const URL_API="http://localhost:3000"


  // const handleHmoChange = (event) => {
  //   setHmo(event.target.value);
  // };
  const handleBirthDateChange = (event) => {
    setBirthDate(event.target.value);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    let userProfile = {
      user_id: document.forms[0].user_id.value,
      userName: document.forms[0].user_name.value,
      HMO:  document.forms[0].hmo.value,
      birthDate: birthDate,
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
    try{
    const response = await fetch(`${URL_API}/users`, {
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
    }}catch (err) {
      console.log(err.message);
    }
  };
  return (
     <div className="form-container">
    
      <Box
        dir="rtl"
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "25vw" },
        }}
        noValidate
        autoComplete="off"
        className="card"
        onSubmit={handleSubmit}
      >
        <h2>ברוכים הבאים לאתר</h2>
        <h3>רק כמה פרטים אישיים ואנחנו מוכנים</h3>
        <Box sx={{ display: "flex", alignItems: "flex-end" }}>
          <ConfirmationNumberIcon
            sx={{ color: "action.active", mr: 1, my: 0.5 }}
          />
          <TextField id="user_id" label="מספר זהות" variant="standard" />
        </Box>
        <Box sx={{ display: "flex", alignItems: "flex-end" }}>
          <PersonIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
          <TextField id="user_name" label="שם" variant="standard" />
        </Box>
        <Box sx={{ display: "flex", alignItems: "flex-end" }}>
          <HMobiledataIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
          <InputLabel
            // slotProps={{ textField: { variant: "standard" } }}
            id="hmoLabel"
          >
            קופת חולים
          </InputLabel>
          <Select
            labelId="hmoLabel"
            id="hmo"
            // value={hmo}
            label="קופת חולים *"
            // onChange={handleHmoChange}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={1}>מאוחדת</MenuItem>
            <MenuItem value={2}>כללית</MenuItem>
            <MenuItem value={3}>לאומית</MenuItem>
            <MenuItem value={4}>מכבי</MenuItem>
          </Select>
        </Box>
        <Box sx={{ display: "flex", alignItems: "flex-end" }}>
          <CalendarMonthIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
              <MobileDatePicker
              inputFormat="DD-MM-YYYY"
                slotProps={{ textField: { variant: "standard" } }}
                label="תאריך לידה"
                id="birth_date"
                onChange={handleBirthDateChange}
              />
          </LocalizationProvider>
        </Box>
        <Box sx={{ display: "flex", alignItems: "flex-end" }}>
          <EmailIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
          <TextField id="user_email" label="כתובת מייל" variant="standard" />
        </Box>
        <Box
          sx={{
            "& > :not(style)": { m: 1, width: "20vw" },
          }}
          className="card"
        >
          <h3>פרטי אב</h3>
          <Box sx={{ display: "flex", alignItems: "flex-end" }}>
            <PersonIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
            <TextField id="father_name" label="שם" variant="standard" />
          </Box>
          <Box sx={{ display: "flex", alignItems: "flex-end" }}>
            <LocalPhoneIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
            <TextField
              id="father_phoneNumber"
              label="מספר טלפון"
              variant="standard"
            />
          </Box>
        </Box>
        <Box
          sx={{
            "& > :not(style)": { m: 1, width: "20vw" },
          }}
          className="card"
        >
          <h3>פרטי אם</h3>
          <Box sx={{ display: "flex", alignItems: "flex-end" }}>
            <PersonIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
            <TextField id="mother_name" label="שם" variant="standard" />
          </Box>
          <Box sx={{ display: "flex", alignItems: "flex-end" }}>
            <LocalPhoneIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
            <TextField
              id="mother_phoneNumber"
              label="מספר טלפון"
              variant="standard"
            />
          </Box>
        </Box>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          אישור
        </Button>
        ={" "}
      </Box>
    </div>
  );
}

export default CreateProfile;
