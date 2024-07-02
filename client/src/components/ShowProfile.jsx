import React, { useEffect, useState } from "react";
import Error from "./Error";
import Loading from "./Loading";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import ClientDetails from "./ClientDetails";

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
         <ClientDetails client={userDetail}/>
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
