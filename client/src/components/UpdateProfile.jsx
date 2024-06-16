import React, { useState } from "react";
import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";


function UpdateProfile({ userDetail, setUserDetail }) {
  //let userDetail=bring user from json data 
  const [updateName, setUpdateName] = useState(userDetail.name);
  const [updateEmail, setUpdateEmail] = useState(userDetail.email);
  const [updateBirthDate, setUpdateBirthDate] = useState(userDetail.birthDate);
  const [updateHMO, setUpdateHMO] = useState(userDetail.hmo);
  const [updateFatherName, setUpdateFatherName] = useState(
    userDetail.father.name
  );
  const [updateFatherPhoneNumber, setUpdateFatherPhoneNumber] = useState(
    userDetail.father.phoneNumber
  );
  const [updateMotherName, setUpdateMotherName] = useState(
    userDetail.mother.name
  );
  const [updateMotherPhoneNumber, setUpdateMotherPhoneNumber] = useState(
    userDetail.mother.phoneNumber
  );

  function updateHandler() {

    updatedProfile={
      userId: userDetail.userId,
      name: updateName,
      birthDate: updateBirthDate,
      email: updateEmail,
      HMO: updateHMO,
      father: {
        name: updateFatherName,
        phoneNumber: updateFatherPhoneNumber,
      },
      mother: {
        name: updateMotherName,
        phoneNumber: updateMotherPhoneNumber,
      },
    }
    
    fetch(`${URL_API}/user/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedProfile),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to update profile");
        }
      })
      .then(() => {
        console.log("Profile updated successfully:", updatedData);
        setPost(updatedData);
      })
      .catch((error) => {
        setFetchError("Error updating profile:", error);
      });

    setProfileState("show")
  }

  return (
    <div>
      <Card
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "70vw" },
        }}
        noValidate
        autoComplete="off"
        dir="rtl"
      >
                  <CardContent>

        <TextField
          id="user_id"
          label="מספר זהות"
          variant="standard"
          value={userDetail.userId}
        />
        <TextField
          id="user_name"
          label="שם"
          variant="standard"
          value={updateName || ""}
          onChange={(e) => setUpdateName(e.target.value)}
        />

        <div>
          <h2>פרטי האב:</h2>
          <TextField
            id="user_father_name"
            label="שם"
            variant="standard"
            value={updateFatherName || ""}
            onChange={(e) => setUpdateFatherName(e.target.value)}
          />
          <TextField
            id="user_father_phoneNumber"
            label="מספר טלפון"
            variant="standard"
            value={updateFatherPhoneNumber || ""}
            onChange={(e) => setUpdateFatherPhoneNumber(e.target.value)}
          />
        </div>
        <div>
          <h2>פרטי האם:</h2>
          <TextField
            id="user_mother_name"
            label="שם"
            variant="standard"
            value={updateMotherName || ""}
            onChange={(e) => setUpdateMotherName(e.target.value)}
          />
          <TextField
            id="user_mother_phoneNumber"
            label="מספר טלפון"
            variant="standard"
            value={updateMotherPhoneNumber || ""}
            onChange={(e) => setUpdateMotherPhoneNumber(e.target.value)}
          />
        </div>

        <TextField
          id="user_email"
          label="כתובת מייל"
          variant="standard"
          value={updateEmail || ""}
          onChange={(e) => setUpdateEmail(e.target.value)}
        />
        <TextField
          id="user_hmo"
          label="קופת חולים"
          variant="standard"
          value={updateHMO || ""}
          onChange={(e) => setUpdateHMO(e.target.value)}
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DatePicker"]}>
            <DatePicker label="birth date" id="birth_date" />
          </DemoContainer>
        </LocalizationProvider>
        </CardContent>
        <CardActions>
            <Button onClick={()=>updateHandler()}>עדכן</Button>
          </CardActions>
      </Card>
    </div>
  );
}

export default UpdateProfile;
