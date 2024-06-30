import React, { useState,useEffect } from "react";
import Error from "./Error";
import Loading from "./Loading";

function AppointmentAlert() {
  const [appointment, setAppointment] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [fetchError, setFetchError] = useState(null);
  useEffect(() => {
    // async()=>await getUsersThatCanceledAppointment();
  });

  async function getUsersThatCanceledAppointment() {
    try {
      const response = await fetch(`${process.env.REACT_APP_URL}/alert/appointment`);
      if (!response.ok) {
        throw Error("Did not received expected data");
      }
      setAppointment(response);
    } catch (err) {
      setFetchError(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      {fetchError && <Error />}
      {isLoading && <Loading />}
      {fetchError &&
        !isLoading &&
        appointment.map((alert) => {
          <Alert severity="info" onClose={() => {}}>{alert}</Alert>;
        })}
    </>
  );
}

export default AppointmentAlert;
