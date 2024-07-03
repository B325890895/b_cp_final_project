
import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import CalenderClient from '../components/CalenderClient';
import CalenderManager from '../components/CalenderManager';


const calendar = ({userState }) => {
  const userId = useParams().id;
  return(
    <>
    {userState=="client"&&
<CalenderClient userId={userId}/>
    }
    { userState=="manager"&&
<CalenderManager/>
    }
    </>
  )

 
}
export default calendar;











