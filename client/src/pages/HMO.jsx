import React from "react";
import Commitment from "../components/Commitment";
import { useNavigate } from "react-router-dom";


function HMO({userState}) {
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
  return (

    <Commitment/>
  );
}

export default HMO;