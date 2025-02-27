import React, { useState, useRef, useEffect } from 'react'
import Button from "@mui/material/Button";
import AddIcon from '@mui/icons-material/Add';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
const URL_API='http://localhost:3000';
function AddClient() {
  const [addClientButton, setAddClientButton] = useState(true)
  const [addClientForm, setAddClientForm] = useState(false);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [userNameValid, setUserNameValid] = useState(true);
  const [emailValid, setEmailValid] = useState(true);
  const [alertAddClient, setAlertAddClient] = useState(false);
  const [disabledAddButton, setDisabledAddButton] = useState(true);
  const [focusUserName, setFocusUserName] = useState(false);
  const [focusedEmail, setFocusedEmail] = useState(false);
  useEffect(
    () => {
      if (userName.length > 0) {
        setUserNameValid(true);
        console.log(userName);
      } else {
        setUserNameValid(false);
      }
    },
    [userName]
  )
  useEffect(
    () => {
      if (email.length > 0 && /\S+@\S+\.\S+/.test(email)) {
        setEmailValid(true);
        console.log(email);
      } else {
        setEmailValid(false);
      }
    },
    [email]
  )
  useEffect(
    () => {
      setDisabledAddButton(!(emailValid && userNameValid))
    }
    , [userNameValid, emailValid,userName,email]
  )
  async function addClientToDatabase() {
    console.log("i will add the new client to the database");
    //here we need to do the reqesst and create a new client in the password data base
    const response = await fetch(`http://localhost:3000/temporaryPassword`, {
      method: "POST",
      body: JSON.stringify({ userName, email }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }).catch((error) => {
      console.log("Error:", error);
    });
    if (response.status == 200) {
      setAlertAddClient(true);
    }
    else{
      alert("קיים משתמש בעל תעודת זהות כזאת")
    }
  }
  async function cancel() {
    console.log("cancel add delete client");
    const response = await fetch(`${URL_API}/temporaryPassword`, {
      method: "DELETE",
      body: JSON.stringify({ "userName":userName }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }).catch((error) => {
      console.log("Error:", error);
    });
    if (response.status === 200) {
      console.log("לקוח נמחק בהצלחה")
      setAlertAddClient(false);
      setAddClientForm(false);setAddClientButton(true), setDisabledAddButton(true)
    }
  
  }
  function addClient() {
    setAddClientForm(!addClientForm)
  }

  return (
    <div>
      {addClientButton && <Button
        onClick={() => { addClient(), setAddClientButton(false); }}
        variant="outlined"
        size="medium"
      >
        <AddIcon /> להוספת לקוח חדש
      </Button>
      }
      {addClientForm &&
        <Card sx={{ minWidth: 275 }}>
          <CardContent>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              הוספת לקוח חדש
            </Typography>
            <TextField
              error={!userNameValid}
              autoFocus
              required
              id="username"
              label="שם משתמש"
              onChange={(e) => setUserName(e.target.value)}
            // defaultValue=""
            />
            <TextField
              error={!emailValid}
              required
              id="email"
              label="כתובת מייל"
              type="email"
              onChange={(e) => setEmail(e.target.value)}

            // defaultValue="Hello World"
            />
          </CardContent>
          <CardActions>
            <Button size="small" type="submit" disabled={disabledAddButton} onClick={addClientToDatabase}>הוספה</Button>
            <Button size="small" onClick={() => { setAddClientForm(false);setAddClientButton(true), setDisabledAddButton(true) }}>ביטול</Button>
          </CardActions>
        </Card>}
      {alertAddClient &&
        <Dialog
          open={open}
          // onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="">
            {`הוספת בהצלחה את משתמש ${userName}`}
          </DialogTitle>
          <DialogContent>
            <DialogContentText >
              {`נשלח כרגע מייל למשתמש`}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={cancel}>ביטול והסרת המשתמש</Button>
            <Button onClick={()=>{setAlertAddClient(false),setAddClientForm(false),setAddClientButton(true)}} autoFocus> אישור  </Button>
          </DialogActions>
        </Dialog>
      }
    </div>
  )
}

export default AddClient
