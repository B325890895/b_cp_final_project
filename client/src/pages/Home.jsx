import React from "react";
import NextTurn from "../components/NextTurn";
import Alert from "../components/Alert";
import AddClient from "../components/AddClient";
function Home({userState}) {
  return (
    <>
      {/* to ask batya what did she do here */}
      {/* {userState == "manager" && <AddClient userName={props.userName} />} */}
      {userState == "manager" && <AddClient/>}
      {userState == "client" && <NextTurn  />}
      <Alert  userState={userState} />
    </>
  );
}

export default Home;
