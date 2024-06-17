import React ,{useState,useRef}from 'react'
import Button from "@mui/material/Button";
import AddIcon from '@mui/icons-material/Add';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

function AddClient  ()  {
    const [addClientForm,setAddClientForm]=useState(false);
   const userName=useRef("")
    function addClientToDatabase(){
        console.log("i will add the new client to the database");
        //here we need to do the reqesst and create a new client in the password data base

    }
    function addClient(){
        setAddClientForm(!addClientForm)
    }

  return (
    <div>
             <Button
          onClick={addClient}
          variant="outlined"
          size="medium"
        >
          <AddIcon /> להוספת לקוח חדש
        </Button>
        {
            addClientForm&&
             (<Card sx={{ minWidth: 275 }}>
                <CardContent>
                  <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    Word of the Day
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" onClick={addClientToDatabase}>הוספה</Button>
                </CardActions>
              </Card>)     }
    </div>
  )
}

export default AddClient
