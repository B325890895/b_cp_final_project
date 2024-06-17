import React from "react";

function CancelingAppointment({ thisAppointment }) {
  console.log(thisAppointment.time.toString());
  function deleteAppointment(){
    fetch(`${URL_API}/appointments/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedProfile),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to update profile");
        }
      })
      .then(() => {
        console.log("Profile updated successfully:", updatedData);
        setPost(updatedData);
      })
      .catch((error) => {
        setFetchError("Error updating profile:", error);
      });

  }
  return (<>
    <div>התור יתקיים בשעה {thisAppointment.time}</div>
    <button onClick={deleteAppointment}>לביטול התור </button>
  </>);
}

export default CancelingAppointment;