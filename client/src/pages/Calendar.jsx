
import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import TimePicker from 'react-time-picker';
import 'react-calendar/dist/Calendar.css';
import 'react-time-picker/dist/TimePicker.css';
import info from '../assets/currentUserInfo.json'
import CancelingAppointment from '../components/Canceling Appointment'
const URL_API = "http://localhost:3000";

const appointments = info[0].Appointments;
const appointmentsDates = appointments.map((appointment) => { return appointment.date });

const calendar = ({ userState }) => {

  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(null);
  const [showAppoint, setShowAppoint] = useState(null);
  const [userId, setUserId] = useState();
  useEffect(() => {
    setTime(null);
  }, [date]);
  useEffect(() => {
    if (useState)
      setUserId(userState);
    getAppointmentsInThisMonth(date.getMonth() + 1, date.getFullYear());
  }, [])
  async function getAppointmentsInThisMonth(month, year) {
    console.log(month, year);
    const filter1 = useState == "manager" ? "*" : useState;
    try {
      const response = await fetch(`${URL_API}/appointment/${filter1}/${month}/${year}`)
      if (!response.ok) {
        throw Error("Did not received expected data");
      }
      const result = await response.json();
      console.log(result);
      // setUserDetail(result);
    } catch (err) {
      // setFetchError(err.message);
    } finally {
      // setIsLoading(false);
    }
    // setAppointments(thisMonthAppointments);
  }
  const handleDateChange = (newDate) => {
    console.log(newDate);

    setDate(newDate);
    // onDateChange(newDate);
  };
  const dayClick = (date) => {
    console.log(date);
    const thisAppointment = getThisAppointment(date)
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
        onActiveStartDateChange={(date) => { setShowAppoint(null); getAppointmentsInThisMonth(date.activeStartDate.getMonth() + 1, date.activeStartDate.getFullYear) }}
        value={date}
        tileDisabled={tileDisabled}
        tileContent={tileContent}
        tileClassNam={{ date }}
      />
      {showAppoint && <CancelingAppointment thisAppointment={showAppoint} />}

    </div>
  );

}
export default calendar;


function getThisAppointment(date) {
  let thisAppoint
  const day = date.getDate(), month = date.getMonth() + 1, year = date.getFullYear();;
  const monthFull = month < 10 ? '0' + month : month;
  if (appointmentsDates.includes(`${year}-${monthFull}-${day}`)) {
    thisAppoint = appointments.find((appoint) => appoint.date == `${year}-${monthFull}-${day}`);
  }
  return thisAppoint;
}










