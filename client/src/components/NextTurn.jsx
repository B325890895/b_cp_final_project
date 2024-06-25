import React, { useEffect, useState } from "react";
import Error from "./Error";
import Loading from "./Loading";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";

function NextTurn() {
  const [appointmentDate, setAppointmentDate] = useState({});
  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
      importCloseAppointmentFromDatabase();
  }, []);

  async function importCloseAppointmentFromDatabase() {
    console.log("ff");
    try {
      const response = await fetch(`http://localhost:3000/appointment/${userName}/next`  );
     console.log(response);
      if (!response.ok) {
        throw Error("Did not received expected data");
      }
      const result = await response.json();
      setAppointmentDate(result);
    } catch (err) {
      setFetchError(err.message);
    } finally {
      setIsLoading(false);
    }


  };

  function deleteAppointmentHandler() {
    if (confirm("האם אתה בטוח שברצונך לבטל את התור?")) {
      console.log("the appointment will be canceled");
       deleteAppointmentFromDatabase();
    } else {
      console.log("the appointmemt will not be canceled");
    }
  }

  async function deleteAppointmentFromDatabase() {
    try {
      const response = await fetch(
        `${URL_API}/appointment/${appointmentDate.id}`,
        {
          method: "DELETE",
          headers: {
            "Content-type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw Error("Failed to update post");
      } else {
        alert("התור בוטל בהצלחה");
      }
    } catch (err) {
      setFetchError(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <Card>
        {fetchError&&
<Error/>}
{isLoading &&
<Loading/>}
        {!fetchError && !isLoading && (
          <>
           התור הקרוב התקיים ביום {appointmentDate.day}
           <br/>
            בתאריך {appointmentDate.date}
            <br/>
            בשעה{appointmentDate.time}
            <CardContent></CardContent>
            <CardActions>
              <Button onClick={deleteAppointmentHandler}>לביטול התור</Button>
            </CardActions>
          </>
        )}
      </Card>
    </>
  );
}

export default NextTurn;
