import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import HourAndDate from "../components/HourAndDate"
import ClientDetails from "../components/ClientDetails";
// import Loading from "./Loading"
// import Error  from "./Error"
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';


function ViewClient({ userState }) {
  const clientId = useParams().id;
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);
  const [hourDateAlert,setHourDateAlert] = useState(false)
  const [hourDateUpdate,setHourDateUpdate] = useState(false)
  const [client, setClient] = useState();
  const navigate = useNavigate();
  const URL_API = "http://localhost:3000";
  switch (userState) {
    case "manager":
      break;
    case "client":
      navigate("/*");
      break;
    default:
      navigate("/*");
      break;
  }

  useEffect(() => {
    fetchClient();
  }, []);

  const fetchClient = async () => {
    try {
      const response = await fetch(`${URL_API}/user/${clientId}`);
      if (!response.ok) {
        throw Error("Did not received clients data from server");
      }
      const result = await response.json();
      setClient(result);
      if(!result.day){
        setHourDateAlert(true)
      }
    } catch (err) {
      setFetchError(err.message);
    } finally {
      setIsLoading(false);
    }
  };
 function updateButtonHandler(){
  setHourDateAlert(false);
  setHourDateUpdate(true);

 }
   return (
    <>
        <Stack sx={{ width: '100%' }} 
        spacing={1}
        >

      {/* {isLoading && <Loading />} */}
      {/* {fetchError && <Error message={fetchError} />} */}
      {!isLoading && !fetchError && (
        <ClientDetails client={client}/>
      )}
      {
        !isLoading && !fetchError && hourDateAlert &&
        <Alert dir="rtl" severity="warning"      action={
          <Button color="inherit" size="small" onClick={updateButtonHandler}>
            <EditIcon/>
          </Button>
        }>
     ללקוח לא מוגדר יום ושעה לטיפול.
      </Alert>  
      }{
        !isLoading && !fetchError && hourDateUpdate &&
        <HourAndDate clientId={client.user_id} setHourDateUpdate={setHourDateUpdate}/>
      }
      </Stack>
    </>
  );
}

export default ViewClient;
