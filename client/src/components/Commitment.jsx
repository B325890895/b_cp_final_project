import React, {useEffect,useState}from "react";
import Error from "./Error";
import Loading from "./Loading";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
const URL_API = "http://localhost:3000";

function Commitment() {
  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  return (
    <>
      <Card dir="rtl">
        {fetchError && <Error />}
        {isLoading && <Loading />}
        {!fetchError && !isLoading && (
          <>
            <Typography component="h1" variant="h3">
              בתאריך {}
              התקבל אישור עבור 24 טיפולים
            </Typography>
            <Typography component="h1" variant="h5">
              עד כה התקיימו {}
              טיפולים
            </Typography>
            {/* <CardActions>
              <Button onClick={deleteAppointmentHandler}>לביטול התור</Button>
            </CardActions> */}
          </>
        )}
      </Card>
    </>
  );
}

export default Commitment;
