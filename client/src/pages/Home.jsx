import React from "react";
import NextTurn from "../components/NextTurn";
import Alert from "../components/Alert";
import AddClient from "../components/AddClient";
import { useParams } from "react-router-dom";
function Home({ userState }) {
  const userId = useParams().id;
  console.log(userId, userState);

  return (
    <>
      {userState == "manager" && <AddClient />}
      {userState == "client" && <NextTurn user_id={userId} />}
      <Alert user_id={userId} userState={userState} />
    </>
  );
}

export default Home;
