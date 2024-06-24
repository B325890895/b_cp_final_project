import React from 'react';
//import './pages_css/Login.css';
//import dotenv from 'dotenv'
//ליבא קובץ סENV כמו שצריך
const URL_API='http://localhost:3000'


function Login ({setConnectionStatus, setUserConnectionInfo}) {
    const handleSubmit = async (event) => {
        // Prevent page reload
        event.preventDefault();

        let userConnectionInfo={
          userName:document.forms[0].uname.value,
          password:document.forms[0].pass.value
        }
        console.log(userConnectionInfo);

        const response = await fetch(`${URL_API}/login/${userName}`, {
          method: "POST",
          body: JSON.stringify({ uname, pass }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }).catch((error) => {
          console.log("Error:", error);
        });

        if(response.status === 200){
          const data = await response.json();
          console.log("successfully connected:", data);
          //go to home page
        }
        else if(response.status === 205){
          console.log("first time entering the password most be changed");
          setUserConnectionInfo(userConnectionInfo);
          setConnectionStatus("newConnection");

        }
        else if(response.status === 400){
          console.log("Error in server");
        }


      };

  return (
    <>
    <div className='Login'>
           <form onSubmit={handleSubmit}>
       <div className="input-container">
         <label>Username </label>
         <input type="text" name="uname" required />
       </div>
       <div className="input-container">
         <label>Password </label>
         <input type="password" name="pass" required />
       </div>
       <div className="button-container">
         <input type="submit" />
       </div>
     </form>
    </div>
    </>
  )
}

export default Login;
