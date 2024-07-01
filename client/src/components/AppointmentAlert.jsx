import React, { useState, useEffect } from "react";
import Error from "./Error";
import Loading from "./Loading";
import AppointmentCanceledAlert from "./AppointmentCanceledAlert";

const URL_API = "http://localhost:3000";

async function fetchAppointments(userName) {
  const response = await fetch(`${URL_API}/alert/appintment/${userName}`);
  console.log(response);
  if (!response.ok) {
    throw new Error("Did not receive expected data");
  }
  return response.json();
}

function AppointmentAlert({userName,userState}) {
  const [appointment, setAppointment] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);


  useEffect( () => {
    async function getData() {
      try {
        const data = await fetchAppointments(userName);
        setAppointment(data);
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
          return (appint.canceledBy != userName) &&
            <AppointmentCanceledAlert alertInfo={appint} />
        })
      }
      {fetchError && <Error />}
      {isLoading && <Loading />}
    </>
  );
}


export default AppointmentAlert;