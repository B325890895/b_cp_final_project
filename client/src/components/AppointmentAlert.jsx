import React, { useState, useEffect } from "react";
import Error from "./Error";
import Loading from "./Loading";
import AppointmentCanceledAlert from "./AppointmentCanceledAlert";

const URL_API = "http://localhost:3000";



function AppointmentAlert({ user_id, userState }) {
  const [appointment, setAppointment] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);


  useEffect(() => {
    console.log("Appointments");
    async function getData() {
      console.log("getData");
      try {
        const data = await fetchAppointments(user_id);
        console.log(data);
        setAppointment(data);
        console.log(data,appointment);
      } catch (err) {
        setFetchError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    getData();
  }, []);
  async function fetchAppointments(user_id) {
    if (userState == "manager") {
      const response = await fetch(`${URL_API}/alert/appointment/manager`);
      if (!response.ok) {
        throw new Error("Did not receive expected data");
      }
      return response.json()
    }
    else {
      const response = await fetch(`${URL_API}/alert/appointment/${user_id}`);

      if (!response.ok) {
        throw new Error("Did not receive expected data");
      }
      return response;
    }
  }
  return (
    <>
      {!fetchError && !isLoading &&
       appointment!=undefined&& appointment.map((appint, kay) => {
          return (userState == "manager" && appint.canceledBy != "manager") &&
            <AppointmentCanceledAlert alertInfo={appint} />
        })
      }
      {fetchError && <Error />}
      {isLoading && <Loading />}
    </>
  );
}


export default AppointmentAlert;