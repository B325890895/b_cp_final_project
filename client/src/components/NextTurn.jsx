import React, { useEffect, useState } from "react";
import Error from "./Error";
import Loading from "./Loading";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
const URL_API = "http://localhost:3000";
function NextTurn(props) {
  const [appointmentDate, setAppointmentDate] = useState({});
  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [toGetAppointment, setToGetAppointment] = useState(false);
  const [open, setOpen] = useState(false);

  function getHoursBetweenDates(futureDate) {
    const now = new Date();
    const [day, month, year] = futureDate.date.split("/").map(Number);
    const [hours, minutes] = futureDate.hour.split(":").map(Number);
    const futureDateFormatDate = new Date(year, month - 1, day, hours, minutes);
    const difference = futureDateFormatDate - now.getTime();
    const hoursDifference = difference / (1000 * 60 * 60);
    return Math.round(hoursDifference * 100) / 100;
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
  const handelOpenAlert = () => {
    setOpen(true);
  };

  useEffect(() => {
    importCloseAppointmentFromDatabase();
  }, []);
  useEffect(() => {
    if (toGetAppointment) {
      importCloseAppointmentFromDatabase();
      setToGetAppointment(false);
    }
  }, [toGetAppointment]);
  async function importCloseAppointmentFromDatabase() {
    try {
      const response = await fetch(
        `${URL_API}/appointment/${props.user_id}/next`,
        {
          method: "GET",
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }
      ).catch((error) => {
        return false;
      });
      if (!response.ok) {
        setAppointmentDate(undefined, response);
        return;
      }
      const result = await response.json();
      setAppointmentDate(result);
    } catch (err) {
      setFetchError(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  async function deleteAppointmentHandler() {
    if (getHoursBetweenDates(appointmentDate) >= 24) {
      if (confirm("האם אתה בטוח שברצונך לבטל את התור?")) {
        const responseDelete = await deleteAppointmentFromDatabase();
        console.log(responseDelete);
        if (!responseDelete) {
          throw new Error("Error deleting appointment");
        } else {
          setToGetAppointment(true);
          // const nextAppointment = await importCloseAppointmentFromDatabase();
        }
      } else {
        console.log("the appointment will not be canceled");
      }
    } else if (getHoursBetweenDates(appointmentDate) >= 4) {
      if (
        confirm(
          "ישנם פחות מארבע שעות עד לטיפול, ביטול יגררור תשלום חלקי האם אתה בטוח שברצונך לבטל את הטיפול?"
        )
      ) {
        const responseDelete = await deleteAppointmentFromDatabase();
        if (!responseDelete) {
          throw new Error("Error deleting appointment");
        } else {
          console.log("Appointment deleted");
          setToGetAppointment(true);
          // const nextAppointment = await importCloseAppointmentFromDatabase();
        }
      } else {
        console.log("the appointment will not be canceled");
      }
    } else {
      alert("ישנם פחות מארבע שעות עד לתור, לא ניתן לבטל את התור באתר אלא רק במספר הטלפון אף תחויבו בתשלום מלא עבור טיפול זה , עמכם הסליחה")
    }
  }

  async function deleteAppointmentFromDatabase() {
    try {
      const response = await fetch(
        `${URL_API}/appointment/${appointmentDate.user_id
        }/${encodeURIComponent(appointmentDate.date)}`,
        {
          method: "DELETE",
          headers: {
            "Content-type": "application/json",
          },
        }
      );
      console.log(response);
      if (response.status != 200) {
        return false;
      }
      else {
        console.log(" delete");

        // alert("התור בוטל בהצלחה");
        handelOpenAlert();
        return true;
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
        {appointmentDate &&
          appointmentDate.dateCenceled &&
          appointmentDate.dateCenceled.length == 1 && (
            <>
              תורך בתאריך {appointmentDate.dateCenceled[0]}התבטל
              <br />
            </>
          )}
        {appointmentDate &&
          appointmentDate.dateCenceled &&
          appointmentDate.dateCenceled.length > 1 && (
            <>
              תורך בתאריכים{" "}
              {appointmentDate.dateCenceled.map((date) => {
                return date + " ";
              })}
              התבטלו
              <br />
            </>
          )}
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
        {appointmentDate == undefined && (
          <CardActions>אין תורים בקרוב</CardActions>
        )}
        {open && (
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert
              onClose={handleClose}
              severity="success"
              variant="outlined"
              sx={{ width: "100%" }}
            >
              התור בוטל בהצלחה!
            </Alert>
          </Snackbar>
        )}
      </Card>
    </>
  );
}

export default NextTurn;
