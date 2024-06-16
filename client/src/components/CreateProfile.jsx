import React, {useRef}from 'react'
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";


function CreateProfile  ({setUserDetail})  {
  const updateName=useRef("")

  return (
    <div>
       <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField id="user_id" label="מספר זהות" variant="standard" />
        <TextField id="user_name" label="שם" variant="standard"
                  onChange={(e) => (updateName.current = e.target.value)}
                  />
        <TextField id="parent_name" label="שם הורה" variant="standard" />
        <TextField id="user_email" label="כתובת מייל" variant="standard" />
        <TextField id="user_phoneNumber" label="מספר טלפון" variant="standard" />



        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DatePicker"]}>
            <DatePicker label="birth date" id="birth_date" />
          </DemoContainer>
        </LocalizationProvider>
      </Box>
    </div>
  )
}

export default CreateProfile
