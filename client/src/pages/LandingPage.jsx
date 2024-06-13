import React from "react";
import { useNavigate } from "react-router-dom";
import "./pages_css/LandingPage.css";
import LoginIcon from "@mui/icons-material/Login";
import Button from "@mui/material/Button";

function LandingPage() {
  const navigate = useNavigate();

  function connect() {
    console.log("Connecting");
    navigate("/connect");
  }
  return (
    <>
      <header>
        <Button
          id="loginButton"
          onClick={connect}
          variant="outlined"
          size="medium"
        >
          <LoginIcon /> להתחברות
        </Button>
      </header>
      <main>
        <img
          id="logoImg"
          src="../src/assets/logo.jpg"
          alt="logo image four people standing on a pice of puzzle and thinking"
        />
        <div id="titleSection">
          <h1> בת שבע כ"ץ</h1>
          <h2>קלינאית תקשורת</h2>
        </div>
      </main>
      <footer></footer>
    </>
  );
}

export default LandingPage;
