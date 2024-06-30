import React, { useState, useEffect } from "react";
import Error from "./Error";
import Loading from "./Loading";
import AppointmentCanceledAlert from "./AppointmentCanceledAlert";

const URL_API = "http://localhost:3000";

async function fetchAppointments() {
  const response = await fetch(`${URL_API}/alert/appintment/manager`);
  if (!response.ok) {
    throw new Error("Did not receive expected data");
  }
  return response.json();
}

function AppointmentAlert() {
  const [appointment, setAppointment] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);


  useEffect(() => {
    async function getData() {
      try {
        const data = await fetchAppointments();
        setAppointment(data);
      } catch (err) {
        setFetchError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    getData();
  }, []);
  useEffect(() => {
    console.log(encodeURIComponent(appointment.date));
  }, [appointment])
  return (
    <>
      {!fetchError && !isLoading &&
        appointment.map((appint, kay) => {
          kay = appint.userName;
          return (appint.canceledBy !== "manager") &&
            <AppointmentCanceledAlert alertInfo={appint} />
        })
      }
      {fetchError && <Error />}
      {isLoading && <Loading />}
    </>
  );
}


export default AppointmentAlert;