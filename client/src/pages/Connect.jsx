import React, { useState } from "react";
import "./pages_css/Login.css";
import Login from "../components/Login";
import FirstLogin from "../components/FirstLogin";

function Connect({setUserState}) {
  const [connectionStatus, setConnectionStatus] = useState("notConnected");
  return (
    <>
      {connectionStatus == "notConnected" && (
        <Login
          setConnectionStatus={setConnectionStatus}
          setUserState={setUserState}
        />
      )}
      {connectionStatus == "newConnection" && (
        <FirstLogin
          setConnectionStatus={setConnectionStatus}
          setUserState={setUserState}
        />
      )}
    </>
  );
}

export default Connect;
