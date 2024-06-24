import React from "react";
import NextTurn from "../components/NextTurn";
import Alert from "../components/Alert";
import AddClient from "../components/AddClient";
function Home() {
  const userState = "client";
  return (
    <>
      <h1>Home</h1>
      {userState == "manager" && <AddClient />}
      {userState == "client" && <NextTurn />}
      <Alert />
    </>
  );
}

export default Home;
