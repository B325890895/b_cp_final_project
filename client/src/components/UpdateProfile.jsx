import React, { useRef } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

function UpdateProfile({ userDetail, setUserDetail }) {
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
        <TextField
          id="user_id"
          label="מספר זהות"
          variant="standard"
          value={userDetail.userId || ""}
          onChange={(e) => setUserDetail({ userId: e.target.value })}
        />
        <TextField
          id="user_name"
          label="שם"
          variant="standard"
          value={userDetail.name || ""}
        />
  
        <div>
          <h2>פרטי האב:</h2>
         <TextField
          id="user_phoneNumber"
          label="מספר טלפון"
          variant="standard"
          value={userDetail.father.name || ""}
        />
        <TextField
          id="user_phoneNumber"
          label="מספר טלפון"
          variant="standard"
          value={userDetail.father.phoneNumber || ""}
        />
        </div>
        <div>
          <h2>פרטי האם:</h2>
         <TextField
          id="user_phoneNumber"
          label="מספר טלפון"
          variant="standard"
          value={userDetail.mother.name || ""}
        />
        <TextField
          id="user_phoneNumber"
          label="מספר טלפון"
          variant="standard"
          value={userDetail.mother.phoneNumber || ""}
        />
        </div>

        <TextField
          id="user_email"
          label="כתובת מייל"
          variant="standard"
          value={userDetail.email || ""}
        />
        <TextField
          id="user_phoneNumber"
          label="קופת חולים"
          variant="standard"
          value={userDetail.hmo || ""}
          />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DatePicker"]}>
            <DatePicker label="birth date" id="birth_date" />
          </DemoContainer>
        </LocalizationProvider>
      </Box>{" "}
    </div>
  );
}

export default UpdateProfile;


