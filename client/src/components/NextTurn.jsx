import React, { useEffect, useState } from "react";
import Error from "./Error";
import Loading from "./Loading";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
const URL_API = "http://localhost:3000";
function NextTurn(props) {
  const [appointmentDate, setAppointmentDate] = useState({});
  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    importCloseAppointmentFromDatabase();
  }, []);

  async function importCloseAppointmentFromDatabase() {
    try {
      const response = await fetch(`${URL_API}/appointment/${props.userName}/next`, {
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }).catch((error) => {
        console.log("Error:", error);
      });
      console.log(response);
      if (!response.ok) {
        setAppointmentDate(undefined, response)
        console.log("Error:", response);
        return;
      }
      const result = await response.json();
      setAppointmentDate(result);
    } catch (err) {
      setFetchError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  async function deleteAppointmentHandler() {
    if (confirm("האם אתה בטוח שברצונך לבטל את התור?")) {
      console.log("the appointment will be canceled");
      await deleteAppointmentFromDatabase();
      const nextAppointment=await importCloseAppointmentFromDatabase();
      setAppointmentDate(nextAppointment);
    } else {
      console.log("the appointmemt will not be canceled");
    }
  }

  async function deleteAppointmentFromDatabase() {
    try {
      const response = await fetch(`${URL_API}/appointment/${appointmentDate.userName}/${encodeURIComponent(appointmentDate.date)}`,
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
        {fetchError &&
          <Error />}
        {isLoading &&
          <Loading />}
        {!fetchError && !isLoading && appointmentDate != undefined && (
          <>
            התור הקרוב התקיים ביום {appointmentDate.day}
            <br />
            בתאריך {appointmentDate.date}
            <br />
            בשעה{appointmentDate.hour}
            <CardActions>
              <Button onClick={ deleteAppointmentHandler}>לביטול התור</Button>
            </CardActions>
          </>
        )}
        {appointmentDate == undefined && <CardActions>אין תורים בקרוב</CardActions>}

      </Card>

    </>
  );
}

export default NextTurn;
