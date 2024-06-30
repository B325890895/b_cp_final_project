import React, { useEffect, useState } from "react";
import Error from "./Error";
import Loading from "./Loading";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
const URL_API = "http://localhost:3000";
function NextTurn(props) {
  const [appointmentDate, setAppointmentDate] = useState({});
  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [toGetAppointment, setToGetAppointment] = useState(false)
  useEffect(() => {
    importCloseAppointmentFromDatabase();
  }, []);
  useEffect(() => {
    if(toGetAppointment){
      importCloseAppointmentFromDatabase();
      setToGetAppointment(false)
    }
  }, [toGetAppointment]);
  async function importCloseAppointmentFromDatabase() {
    try {
      const response = await fetch(`${URL_API}/appointment/${props.userName}/next`, {
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }).catch((error) => {
        return false;
      });
      if (!response.ok) {
        setAppointmentDate(undefined, response)
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
      const responseDelete = await deleteAppointmentFromDatabase();
      if (!responseDelete) {
        throw new Error("Error deleting appointment");
      }
      else {
        setToGetAppointment(true)
        // const nextAppointment = await importCloseAppointmentFromDatabase();
      }
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
      )
      console.log("");
      if (response.status != 200) {
        return false;
      } else {
        alert("התור בוטל בהצלחה");
        return true
      }
    } catch (err) {

      setFetchError(err.message);
      return false;
    } finally {
      setIsLoading(false);
    }

  }

  return (
    <>
      <Card>
        {fetchError && <Error />}
        {isLoading && <Loading />}
        {appointmentDate&&appointmentDate.dateCenceled && appointmentDate.dateCenceled.length == 1 && (<>תורך בתאריך {appointmentDate.dateCenceled[0]}התבטל<br /></>)}
        {appointmentDate&&appointmentDate.dateCenceled && appointmentDate.dateCenceled.length > 1 && (<>תורך בתאריכים {appointmentDate.dateCenceled.map((date) => { return date + " " })}התבטלו<br /></>)}
        {!fetchError && !isLoading && appointmentDate != undefined && (
          <>
            התור הקרוב התקיים ביום {appointmentDate.day} <br />
            בתאריך {appointmentDate.date} <br />
            בשעה{appointmentDate.hour}
            <CardActions>
              <Button onClick={deleteAppointmentHandler}>לביטול התור</Button>
            </CardActions>
          </>
        )}
        {appointmentDate == undefined && <CardActions>אין תורים בקרוב</CardActions>}

      </Card>

    </>
  );
}

export default NextTurn;
