import React, { useEffect } from "react";
import ReportAlert from "./ReportAlert";
import AppointmentAlert from "./AppointmentAlert";

function Alert({userState,user_id}) {
  if (userState == "manager") {
    return (
      <>
        <ReportAlert />
        <AppointmentAlert userState={"manager"} user_id={user_id}/>
      </>
    );
  }
  if (userState == "client") {
    return (<>       
     <AppointmentAlert userState={"client"} user_id={user_id}/>
    </>)
  }
}

export default Alert;
