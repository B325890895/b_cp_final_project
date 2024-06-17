
import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import TimePicker from 'react-time-picker';
import 'react-calendar/dist/Calendar.css';
import 'react-time-picker/dist/TimePicker.css';
import info from '../assets/currentUserInfo.json'
import CancelingAppointment from '../components/Canceling Appointment'
const appointments = info[0].Appointments;
const appointmentsDates = appointments.map((appointment) => { return appointment.date });

const CalendarComponent = ({ onDateChange, availableHours }) => {

  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(null);
  const [showAppoint, setShowAppoint] = useState(null);
  useEffect(() => {
    setTime(null);
  }, [date]);
  useEffect(() => {
    console.log(showAppoint)
  }
  ,[showAppoint])
  const handleDateChange = (newDate) => {
    setDate(newDate);
    // onDateChange(newDate);
  };
  const dayClick = (date) => {
    const thisAppointment =getThisAppointment(date)
    if (thisAppointment) {
      console.log(date);
      setShowAppoint(thisAppointment);
    }
    else {
      setShowAppoint(null);
    }
  }
  // const handleTimeChange = (newTime) => {
  //   setTime(newTime);
  // };

  const tileDisabled = ({ date, view }) => {
    if (view === 'month') {
      const today = new Date();
      return date < today.setHours(0, 0, 0, 0);
    }
    return !availableHours.includes(date.getHours());
  };
  const tileContent = ({ date }) => {
    let remarks;
    const thisAppoint = getThisAppointment(date);
    if (thisAppoint) remarks = thisAppoint.status.toString();
    return <div style={{ color: 'green', width: '100%', height: '100%' }}>{remarks}</div>;
  }
  return (
    <div>
      <Calendar
        // nextLabel='month>>'
        defaultValue={date}
        onChange={handleDateChange}
        onClickDay={dayClick}
        onActiveStartDateChange={()=>{ setShowAppoint(null)}}
        value={date}
        tileDisabled={tileDisabled}
        tileContent={tileContent}
        tileClassNam={{ date }}
      />
      {showAppoint&&<CancelingAppointment thisAppointment={showAppoint}/>}

    </div>
  );

}
export default CalendarComponent;


function getThisAppointment(date) {
  let thisAppoint
  const day = date.getDate(), month = date.getMonth() + 1, year = date.getFullYear();;
  const monthFull = month < 10 ? '0' + month : month;
  if (appointmentsDates.includes(`${year}-${monthFull}-${day}`)) {
    thisAppoint = appointments.find((appoint) => appoint.date == `${year}-${monthFull}-${day}`);
  }
  return thisAppoint;
}










