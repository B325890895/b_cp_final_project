import React from "react";

function CancelingAppointment({ thisAppointment }) {
  console.log(thisAppointment.time.toString());
  return (<>
    <div>התור יתקיים בשעה {thisAppointment.time}</div>
    <button >לביטול התור </button>
  </>);
}

export default CancelingAppointment;