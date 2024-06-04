import React, { useEffect, useState } from "react";
import Error  from './Error';
import Loading from './Loading';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';


function ShowProfile() {
  const [isLoading, setIsLoading] = useState(false);
  const [fetchError, setFetchError] = useState(null);
  const [userDetail, setUserDetail] = useState();

  // useEffect(() => {
  //   async () => await importUserDetailsFromDatabase();
  // }, []);

  // const importUserDetailsFromDatabase = async () => {
  //   try {
  //     const response = await fetch(`${URL_API}/${userId}`);
  //     if (!response.ok) {
  //       throw Error("Did not received expected data");
  //     }
  //     const result = await response.json();
  //     setUserDetail(result);
  //   } catch (err) {
  //     setFetchError(err.message);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  return (<div>
    {/* {fetchError&&
    <Error/>}
    {isLoading &&
    <Loading/>} */}
    {!fetchError &&!isLoading &&
  
  <Box
  sx={{
    display: 'flex',
    flexWrap: 'wrap',
    '& > :not(style)': {
      m: 1,
      width: 500,
      height: 500,
    },
  }}
>
  <Paper elevation={3} >
    <h1> {userDetail.userName}</h1>
    <h3>מספר זהות: {userDetail.userId}</h3>
    <h3>שם הורה: {userDetail.parentName}</h3>
    <h3>כתובת מייל: {userDetail.userEmail}</h3>
    <h3>מספר טלפון: {userDetail.userPhoneNumber}</h3>
    <h3>תאריך לידה: {userDetail.birthDate}</h3>
    </Paper>
  
</Box>

    }
  </div>);
}

export default ShowProfile;
