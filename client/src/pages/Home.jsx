import React from "react";
import NextTurn from "../components/NextTurn";
import Alert from "../components/Alert";
import AddClient from "../components/AddClient";
function Home() {
  const userState = "client";
  return (
    <>
      <h1>Home</h1>
      {/* to ask batya what did she do here */}
      {/* {userState == "manager" && <AddClient userName={props.userName} />} */}
      {userState == "manager" && <AddClient />}

      {userState == "client" && <NextTurn userName={"bbbb"} />}
      <Alert />
    </>
  );
}

export default Home;
