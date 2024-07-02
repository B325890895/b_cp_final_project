import React from "react";
import NextTurn from "../components/NextTurn";
import Alert from "../components/Alert";
import AddClient from "../components/AddClient";

function Home({userState}) {

  return (
    <>
      {userState == "manager" && <AddClient/>}
      {userState == "client" && <NextTurn user_id={"325890895"} />}
      <Alert  userState={userState} />
    </>
  );
}

export default Home;
