import React from "react";

function Singup({ userConnectionInfo }) {
  const handleSubmit = async (event) => {
    // Prevent page reload
    event.preventDefault();
    let userConnection = {
      uname: document.forms[0].uname.value,
      oldPass: document.forms[0].oldPass.value,
      newPass: document.forms[0].newPass.value,
      verifyPass: document.forms[0].verifyPass.value,
    };
    if(userConnection.newPass !== userConnection.verifyPass){
        alert("Passwords do not match");
        return;
    }
    else{
        let response = await fetch(`${URL_API}/login`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userConnection),
        });
        if (response.status === 200) {
          alert("Password changed successfully");
          //go to the home page
        }
        else{
            alert("Password change failed");
        }
    }
  };
  return (
    <div className="Login">
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label>Username </label>
          <input type="text" name="uname" value={userConnectionInfo.uname} />
        </div>
        <div className="input-container">
          <label>Old password </label>
          <input
            type="password"
            name="oldPass"
            value={userConnectionInfo.pass}
          />
        </div>
        <div className="input-container">
          <label>New password </label>
          <input type="password" name="newPass" required />
        </div>
        <div className="input-container">
          <label>Verify password </label>
          <input type="password" name="verifyPass" required />
        </div>
        <div className="button-container">
          <input type="submit" />
        </div>
      </form>
    </div>
  );
}

export default Singup;
