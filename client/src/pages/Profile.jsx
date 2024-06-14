import React, {useState,useEffect} from "react";
import ShowProfile from "../components/ShowProfile";
import CreateProfile from "../components/CreateProfile";
import UpdateProfile from "../components/UpdateProfile";

export default function Profile() {

  const [profileState,setProfileState]=useState("show");
  const [userDetail, setUserDetail] = useState({
    userId: "658941237",
    name: "אבי אברהם",
    birthDate: "17/02/2007",
    email: "abc@abc.com",
    father: { name: "בני בנימין", phoneNumber: "0583598746" },
    mother: { name: "מיכל מיכאלי", phoneNumber: "047896523" },
    HMO: "מאוחדת",
  });

  useEffect(() => {
    //async () => await importUserDetailsFromDatabase();
  }, []);

  const importUserDetailsFromDatabase = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_URL}/${userId}`);
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
    {profileState=="create"&& <CreateProfile setUserDetail={setUserDetail} setProfileState={setProfileState}/>}
     {profileState=="show"&&<ShowProfile userDetail={userDetail} setProfileState={setProfileState}/>}
     {profileState=="update"&&<UpdateProfile userDetail={userDetail} setUserDetail={setUserDetail} setProfileState={setProfileState}/>}

    </>
  );
}
