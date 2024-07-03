import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
// import "./pages_css/Profile.css";
import ShowProfile from "../components/ShowProfile";
// import CreateProfile from "./CreateProfile";
import UpdateProfile from "../components/UpdateProfile";
// import info from '../assets/currentUserInfo.json';
import Error from "../components/Error";
import Loading from "../components/Loading";


export default function Profile({ userState }) {
  const userId = useParams().id;
  const URL_API = "http://localhost:3000"
  const [profileState, setProfileState] = useState("show");
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);
  const [userDetail, setUserDetail] = useState();
  const navigate = useNavigate();

  switch (userState) {
    case "client":
      break;
    case "manager":
      navigate("/*");
      break;
    default:
      navigate("/*");
      break;
  }

  useEffect(() => {
    if (userDetail == undefined) {
       importUserDetailsFromDatabase();
    }
  }, []);

  async function importUserDetailsFromDatabase() {
    try {
      const response = await fetch(`${URL_API}/user/${userId}`);
      if (!response.ok) {
        throw Error("Did not received expected data");
      }
      console.log(response);
      const result = await response.json();
      setUserDetail(result);
    } catch (err) {
      setFetchError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {fetchError &&
        <Error />}
      {isLoading &&
        <Loading />}
      {/* {profileState=="create"&&!fetchError && !isLoading && <CreateProfile id="" setUserDetail={setUserDetail} setProfileState={setProfileState}/>} */}
      {profileState == "show" && !fetchError && !isLoading && <ShowProfile userDetail={userDetail} setProfileState={setProfileState} />}
      {profileState == "update" && !fetchError && !isLoading && <UpdateProfile userDetail={userDetail} setProfileState={setProfileState} />}

    </>
  );
}
