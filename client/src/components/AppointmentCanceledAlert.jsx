import React, { useState, useEffect } from "react";
import Alert from '@mui/material/Alert';
import { Await } from "react-router-dom";
import Error from "./Error";
const URL_API = "http://localhost:3000";

function AppointmentCanceledAlert({ alertInfo }) {
    console.log(alertInfo, "Appointment");
    const [alertState, setAlertState] = useState(true);
    
    async function hendlerClose() {
        setAlertState(false);
        const response = await deleteAppointmentCanceled();
        if (!response.ok) {
            <Error />
        }
    }
    async function deleteAppointmentCanceled() {
        return (await fetch(`${URL_API}/alert/appintment/${alertInfo.user_id}/${encodeURIComponent(alertInfo.date)}`, {
            method: "DELETE",
            Headers: {
                "Content-type": "application/json; charset=UTF-8",
            }
        }));
    }


    return (<>
        {alertState &&
            <Alert
                severity="info"
                onClose={async () => await hendlerClose()} >
                {`${alertInfo.date} ${alertInfo.hour} ${alertInfo.user_id} `}
            </Alert >
        }

    </>)
}
export default AppointmentCanceledAlert;