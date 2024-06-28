import React, {useState,useEffect} from "react";
// import "./pages_css/Profile.css";
import ShowProfile from "../components/ShowProfile";
// import CreateProfile from "./CreateProfile";
import UpdateProfile from "../components/UpdateProfile";
// import info from '../assets/currentUserInfo.json';
import Error from "../components/Error";
import Loading from "../components/Loading";


export default function Profile() {

  const URL_API="http://localhost:3000"
  const [profileState,setProfileState]=useState("show");
  const [isLoading, setIsLoading] = useState(false);
  const [fetchError, setFetchError] = useState(null);
  // const userDetail=info[0].userInfo;

  useEffect(() => {
    if(!userDetail)
      {
        async () => await importUserDetailsFromDatabase();
      }
  }, []);

  const importUserDetailsFromDatabase = async () => {
    try {
      const response = await fetch(`${URL_API}/${userId}`);
      if (!response.ok) {
        throw Error("Did not received expected data");
      }
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
          {fetchError&&
    <Error/>}
    {isLoading &&
    <Loading/>}
    {/* {profileState=="create"&&!fetchError && !isLoading && <CreateProfile id="" setUserDetail={setUserDetail} setProfileState={setProfileState}/>} */}
     {profileState=="show"&&!fetchError && !isLoading &&<ShowProfile userDetail={userDetail} setProfileState={setProfileState}/>}
     {profileState=="update"&&!fetchError && !isLoading &&<UpdateProfile setProfileState={setProfileState}/>}

    </>
  );
}
