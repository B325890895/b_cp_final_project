import React, { useEffect } from "react";
import ReportAlert from "./ReportAlert";
import AppointmentAlert from "./AppointmentAlert";

function Alert() {
  console.log("alert");
  const userState = "manager";
  if (userState == "manager") {
    return (
      <>
        <ReportAlert />
        <AppointmentAlert />
      </>
    );
  }
  if (userState == "client") {
  }

  return <></>;
}

export default Alert;
