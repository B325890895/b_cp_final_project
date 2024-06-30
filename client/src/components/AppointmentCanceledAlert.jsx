import React, { useState, useEffect } from "react";
import Alert from '@mui/material/Alert';
import { Await } from "react-router-dom";
import Error from "./Error";
const URL_API = "https://localhost:3000";

function AppointmentCanceledAlert({ alertInfo }) {
    const [alertState, setAlertState] = useState(true);
    useEffect(() => {
        // console.log(alertInfo);
        console.log(encodeURIComponent(alertInfo.date));
    }, [])
    async function hendlerClose() {
        setAlertState(false);
        const response = await deleteAppointmentCanceled();
        if (!response.ok) {
            <Error />
        }
    }
    async function deleteAppointmentCanceled() {
        return (await fetch(`${URL_API}/alert/appointment/${alertInfo.userName}/${encodeURIComponent(alertInfo.date)}`, {
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
                {`${alertInfo.date} ${alertInfo.hour} ${alertInfo.userName} `}
            </Alert >
        }

    </>)
}
export default AppointmentCanceledAlert;