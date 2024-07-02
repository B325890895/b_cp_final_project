
import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import TimePicker from 'react-time-picker';
import 'react-calendar/dist/Calendar.css';
import 'react-time-picker/dist/TimePicker.css';
import CancelingAppointment from '../components/Canceling Appointment';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Loading from '../components/Loading';
import Error from '../components/Error';
import { Typography } from '@mui/material';

const URL_API = "http://localhost:3000";

const calendar = ({ userState }) => {

  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(null);
  const [showAppoint, setShowAppoint] = useState(null);
  const [userId, setUserId] = useState(userState);
  const [thisMonthAppointments, setThisMonthAppointments] = useState();
  const [isLoudingBool, setIsLoadingBool] = useState(true);
  const [fetchError, setFetchError] = useState();
  useEffect(() => {
    setTime(null);
  }, [date]);
  useEffect(() => {
    const fetchAppointments = async () => {
      if (userState) {
        setUserId(userState);
      }
      await getAppointmentsInThisMonth(date.getMonth() + 1, date.getFullYear());
    };
    fetchAppointments();
  }, [userState]);
  useEffect(() => {
    console.log(thisMonthAppointments);
    if (thisMonthAppointments) {
      setIsLoadingBool(false);
    }
  }, [thisMonthAppointments]);
  async function getAppointmentsInThisMonth(month, year) {
    setIsLoadingBool(true);
    let filter1
    if (userId == "manager") {
      console.log("filter1");
      filter1 = "*";
    }
    else {
      filter1 = userId;
    }
    const dateFormat = encodeURIComponent(`${month}/${year}`)
    try {
      console.log(`${URL_API}/appointment/${filter1}/${dateFormat}`, filter1);
      const response = await fetch(`${URL_API}/appointment/${filter1}/${dateFormat}`)
      if (!response.ok) {
        throw Error("Did not received expected data");
      }
      const result = await response.json();
      setThisMonthAppointments(result)
    } catch (err) {
      setFetchError(err.message);
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
   
    // const thisDayAppointments = getThisAppointments(date);
    // console.log(thisDayAppointments);
    // let context;
    // if (thisDayAppointments != undefined) {
    //   if (userId == "manager") {
    //     thisDayAppointments.map((appoint) => {
    //       console.log(appoint);
    //       context += <Typography variant="h1" component="h6">
    //         <>{appoint.userName}</>
    //         <>{appoint.hour}</>
    //         {(appoint.status == 0) && <>התור בוטל</>}
    //       </Typography>
    //     })
    //   }
    //   else {

    //     if (thisDayAppointments.length > 1) {
    //       throw new Error("error get appointments")
    //     }
    //     context = <Typography variant="h1" component="h6">
    //       <>{appoint.hour}</>
    //       {(appoint.status == 0) && <>התור בוטל</>}
    //     </Typography>
    //   }
    // }
    // return context;
  }
  function getThisAppointments(date) {
    console.log(thisMonthAppointments);
    let thisDayAppointmentGet=[]
    const thisDay = date.getDate(), thisMonth = date.getMonth()+1, thisYear = date.getFullYear();;
    const monthFull = thisMonth < 10 ? '0' + thisMonth : thisMonth;
    console.log(`${thisDay}/${monthFull - 1}/${thisYear}`)
    if (userId == "manager") {
      thisMonthAppointments.map((appoint) => {
        console.log(appoint, `${thisDay}/${monthFull }/${thisYear}`);
        if (appoint != undefined && appoint.date == `${thisDay}/${monthFull}/${thisYear}`)
          console.log(appoint);
          thisDayAppointmentGet.push(appoint);
      })
    }
    else {
      thisDayAppointmentGet = thisMonthAppointments.map((appoint) => {
        if (appoint.date == `${thisDay}/${monthFull - 1}/${thisYear}` && appoint.userName == userId)
          return appoint;
      })
    }
    return thisDayAppointmentGet;
  }
  return (
    <>
      {fetchError && <Error />}
      {isLoudingBool && <Loading />}
      {!fetchError && !isLoudingBool && <Calendar
        // nextLabel='month>>'
        defaultValue={date}
        onChange={handleDateChange}
        onClickDay={dayClick}
        onActiveStartDateChange={(date) => {
          setShowAppoint(null);
          getAppointmentsInThisMonth(date.activeStartDate.getMonth() + 1, date.activeStartDate.getFullYear)
        }}

        value={date}
        tileDisabled={tileDisabled}
        tileContent={tileContent}
        tileClassNam={{ date }}
      />}
      {showAppoint && <CancelingAppointment thisAppointment={showAppoint} />}
    </>
  );
}
export default calendar;











