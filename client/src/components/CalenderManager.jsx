
import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";

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



function CalenderManager  ()  {
        const userId = useParams().id;
      const URL_API = 'http://localhost:3000'
        const [date, setDate] = useState(new Date());
        const [time, setTime] = useState(null);
        const [showAppoint, setShowAppoint] = useState(null);
        const [thisMonthAppointments, setThisMonthAppointments] = useState();
        const [isLoadingBool, setIsLoadingBool] = useState(false);
        const [fetchError, setFetchError] = useState();
        const [appointments, setAppointments] = useState([]);
        useEffect(() => {
          setTime(null);
        }, [date]);
        useEffect(() => {
          console.log(thisMonthAppointments);
          if (thisMonthAppointments) {
            setIsLoadingBool(false);
          }
        }, [thisMonthAppointments]);
        useEffect(() => {
            console.log("use effect");
          getAppointmentsInThisMonth(date.getMonth() + 1, date.getFullYear());
        }, []);
        async function getAppointmentsInThisMonth(month, year) {
          setIsLoadingBool(true);
          let filter1="*";
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
            console.log(err);
            setFetchError(err.message);
          }
           setAppointments(thisMonthAppointments);
        }
        async function handleDateChange  (newDate) {
          console.log(newDate);
      
          setDate(newDate);
           onDateChange(newDate);
        };
        async function dayClick (date)  {
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
        async function handleTimeChange  (newTime) {
          setTime(newTime);
        };
      
       async function tileDisabled  ({ date, view }) {
          if (view === 'month') {
            const today = new Date();
            return date < today.setHours(0, 0, 0, 0);
          }
          return !availableHours.includes(date.getHours());
        };
        async function tileContent  ({ date })  {
          let remarks;
         
          const thisDayAppointments = getThisAppointments(date);
          console.log(thisDayAppointments);
          let context;
          if (thisDayAppointments != undefined) {
            if (userId == "manager") {
              thisDayAppointments.map((appoint) => {
                console.log(appoint);
                context += <Typography variant="h1" component="h6">
                  <>{appoint.userName}</>
                  <>{appoint.hour}</>
                  {(appoint.status == 0) && <>התור בוטל</>}
                </Typography>
              })
            }
            else {
      
              if (thisDayAppointments.length > 1) {
                throw new Error("error get appointments")
              }
              context = <Typography variant="h1" component="h6">
                <>{appoint.hour}</>
                {(appoint.status == 0) && <>התור בוטל</>}
              </Typography>
            }
          }
          return context;
        }
       async function getThisAppointments(date) {
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
            console.log(thisMonthAppointments);
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
            {isLoadingBool && <Loading />}
            {!fetchError && !isLoadingBool && <Calendar
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
            //   tileContent={tileContent()}
              tileClassNam={{ date }}
            />}
            {showAppoint && <CancelingAppointment thisAppointment={showAppoint} />}
          </>
        );
}

export default CalenderManager
