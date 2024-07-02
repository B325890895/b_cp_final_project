import React,{useState,useEffect} from "react";
import { useParams, useNavigate } from "react-router-dom";
// import Loading from "./Loading"
// import Error  from "./Error"
import "../pages/pages_css/CreateProfile.css"
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";


function ViewClient() {
  const clientId = useParams().id;
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);
  const [client, setClient] = useState();
  const URL_API="http://localhost:3000";

  useEffect(() => {
    (async () => await fetchClient())();
  }, []);
  const fetchClient = async () => {
    console.log(clientId);
    try {
      const response = await fetch(`${URL_API}/user/${clientId}`);
      if (!response.ok) {
        throw Error("Did not received clients data from server");
      }
      log(response)
      const result = await response.json();
      console.log(result);
      setClient(result);
    } catch (err) {
      setFetchError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
    {/* {isLoading && <Loading />} */}
    {/* {fetchError && <Error message={fetchError} />} */}
    {
    !isLoading && !fetchError &&
     (

    <Container component="main" maxWidth="lg" dir="rtl">
      <CssBaseline />
      <Box className="form-container">
        <Box
        dir="rtl"
          noValidate
          className="form-content"
        >
          <Box className="left-side">
            <Box id="profile">
              <Typography component="h1" variant="h4">
                {client.user_id}ת.ז.:
              </Typography>
              <Typography component="h1" variant="h4">
                {client.userName}שם:
              </Typography>
              <Typography component="h1" variant="h6">
                {client.email}כתובת מייל:
              </Typography>
              <Typography component="h1" variant="h6">
                {client.hmo}קופת חולים:
              </Typography>
              <Typography component="h1" variant="h6">
                {client.birthDate} תאריך לידה:
              </Typography>
            </Box>
          </Box>

          <Box className="right-side">
            <Box id="father">
              <Typography component="h1" variant="h5">
                פרטי אב
              </Typography>
              <Typography component="h1" variant="h6">
                {client.father.name}שם:
              </Typography>
              <Typography component="h1" variant="h6">
                {client.father.phoneNumber}טלפון:
              </Typography>
            </Box>
            <Box id="mother">
              <Typography component="h1" variant="h5">
                פרטי אם
              </Typography>
              <Typography component="h1" variant="h6">
                {client.mother.name}שם:
              </Typography>
              <Typography component="h1" variant="h6">
                {client.mother.phoneNumber}טלפון:
              </Typography>
            </Box>
          </Box>
        </Box>
{/* 
        <Box className="submit-button">
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            שמירת פרטים
          </Button>
        </Box> */}
      </Box>
    </Container>)}
    </>
  );
}

export default ViewClient;
