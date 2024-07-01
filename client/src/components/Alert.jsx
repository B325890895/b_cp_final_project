import React, { useEffect } from "react";
import ReportAlert from "./ReportAlert";
import AppointmentAlert from "./AppointmentAlert";

function Alert({userState,user_id}) {
  if (userState == "manager") {
    return (
      <>
        <ReportAlert />
        <AppointmentAlert userState={"manager"} user_id={"manager"}/>
      </>
    );
  }
  if (userState == "client") {
    return (<>       
     <AppointmentAlert userState={"client"} user_id={"325890895"}/>
    </>)
  }
}

export default Alert;
