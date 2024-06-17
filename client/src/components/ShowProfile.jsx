import React, { useEffect, useState } from "react";
import Error from "./Error";
import Loading from "./Loading";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import TextField from '@mui/material/TextField';

function ShowProfile({userDetail,setProfileState}) {
  const [isLoading, setIsLoading] = useState(false);
  const [fetchError, setFetchError] = useState(null);


  function updateHandler() {
    setProfileState("update")
  }
  return (
    <>
      {/* {fetchError&&
    <Error/>}
    {isLoading &&
    <Loading/>} */}
      {!fetchError && !isLoading && (
        <Card    sx={{
          "& > :not(style)": { m: 1, width: "80vw" },
        }}>
          <CardContent>
            <div dir="rtl">
              <h1> {userDetail.name}</h1>
              <h3>מספר זהות: {userDetail.userId}</h3>
              <h3>תאריך לידה: {userDetail.birthDate}</h3>
              <div>
                <h2>פרטי אב:</h2>
                <h3>שם האב: {userDetail.father.name}</h3>
                <h3>מספר טלפון: {userDetail.father.phoneNumber}</h3>
              </div>
              <div>
                <h2>פרטי האם:</h2>
                <h3>שם האם: {userDetail.mother.name}</h3>
                <h3>מספר טלפון: {userDetail.mother.phoneNumber}</h3>
              </div>
              <h3>כתובת מייל: {userDetail.email}</h3>
              <h3>קופת חולים:{userDetail.HMO}</h3>
            </div>
          </CardContent>
          <CardActions>
            <Button onClick={()=>updateHandler()}>עידכון</Button>
          </CardActions>
        </Card>
      )}
    </>
  );
}

export default ShowProfile;
