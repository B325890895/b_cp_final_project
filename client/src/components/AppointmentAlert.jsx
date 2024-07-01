import React, { useState, useEffect } from "react";
import Error from "./Error";
import Loading from "./Loading";
import AppointmentCanceledAlert from "./AppointmentCanceledAlert";

const URL_API = "http://localhost:3000";

async function fetchAppointments(user_id) {
  console.log("fetchAppointments");
  const response = await fetch(`${URL_API}/alert/appintment/${user_id}`);
  if (!response.ok) {
    throw new Error("Did not receive expected data");
  }
  return response.json();
}

function AppointmentAlert({user_id,userState}) {
  const [appointment, setAppointment] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);


  useEffect( () => {
    async function getData() {
      console.log("getData");
      try {
        const data = await fetchAppointments(user_id);
        console.log(data);
        setAppointment(data);
        console.log(data);
      } catch (err) {
        setFetchError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    getData();
  }, []);
  
  return (
    <>
      {!fetchError && !isLoading &&
        appointment.map((appint, kay) => {
          console.log(appint);
          return (appint.canceledBy != user_id) &&
            <AppointmentCanceledAlert alertInfo={appint} />
        })
      }
      {fetchError && <Error />}
      {isLoading && <Loading />}
    </>
  );
}


export default AppointmentAlert;