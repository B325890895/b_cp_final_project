import React,{useEffect,useState} from 'react'
import Alert from '@mui/material/Alert';
import Error from "../components/Error";
import Loading from "../components/Loading";


function ReportAlert  ()  {
    const [reports,setReports]=useState([])
    const [isLoading, setIsLoading] = useState(false);
    const [fetchError, setFetchError] = useState(null);
    useEffect(()=>{
       // async()=>await getUsersHwoNeedANewReport();
    })

    async function getUsersHwoNeedANewReport(){
        try {
            const response = await fetch(`${process.env.REACT_APP_URL}/alert/report`);
            if (!response.ok) {
              throw Error("Did not received expected data");
            }
            setReports(response);
          } catch (err) {
            setFetchError(err.message);
          } finally {
            setIsLoading(false);
          }
    }

  return (
    <>
         {fetchError&&
    <Error/>}
    {isLoading &&
    <Loading/>}
    {
fetchError && !isLoading &&
reports.map((alert)=>{
    <Alert severity="warning">{alert}</Alert>
})
    }
    </>
  )
}

export default ReportAlert
