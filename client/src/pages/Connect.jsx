import React, { useState } from "react";
import "./pages_css/Login.css";
import Login from "../components/Login";
import FirstLogin from "../components/FirstLogin";

function Connect({setUserId,setUserState}) {
  const [connectionStatus, setConnectionStatus] = useState("notConnected");
  return (
    <>
      {connectionStatus == "notConnected" && (
        <Login
          setConnectionStatus={setConnectionStatus}
          setUserId={setUserId}
          setUserState={setUserState}
        />
      )}
      {connectionStatus == "newConnection" && (
        <FirstLogin
          setConnectionStatus={setConnectionStatus}
          setUserId={setUserId}
          setUserState={setUserState}
        />
      )}
    </>
  );
}

export default Connect;
