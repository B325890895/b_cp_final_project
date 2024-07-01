import React, { useEffect } from "react";
import ReportAlert from "./ReportAlert";
import AppointmentAlert from "./AppointmentAlert";

function Alert({userState,userName}) {
  if (userState == "manager") {
    return (
      <>
        <ReportAlert />
        <AppointmentAlert userState={"manager"} userName={"manager"}/>
      </>
    );
  }
  if (userState == "client") {
    return (<>       
     <AppointmentAlert userState={"client"} userName={"325890895"}/>
    </>)
  }
}

export default Alert;
