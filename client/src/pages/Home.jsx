import React from "react";
import NextTurn from "../components/NextTurn";
import Alert from "../components/Alert";
import AddClient from "../components/AddClient";

function Home({userId,userState}) {

  return (
    <>
      {userState == "manager" && <AddClient/>}
      {userState == "client" && <NextTurn user_id={userId} />}
      <Alert  user_id={userId} />
    </>
  );
}

export default Home;
