
import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import TimePicker from 'react-time-picker';
import 'react-calendar/dist/Calendar.css';
import 'react-time-picker/dist/TimePicker.css';
import info from '../assets/currentUserInfo.json'
const appointments = info[0].Appointments;
const appointmentsDates = appointments.map((appointment) => { return appointment.date });

const CalendarComponent = ({ onDateChange, availableHours }) => {
  console.log(appointmentsDates);

  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(null);
  useEffect(() => {
    setTime(null);
  }, [date]);

  const handleDateChange = (newDate) => {
    setDate(newDate);
    onDateChange(newDate);
  };

  const handleTimeChange = (newTime) => {
    setTime(newTime);
  };

  const tileDisabled = ({ date, view }) => {
    if (view === 'month') {
      const today = new Date();
      return date < today.setHours(0, 0, 0, 0);
    }
    return !availableHours.includes(date.getHours());
  };
  const tileContent = ({ date }) => {
    let remarks;
    console.log("blaaa",date.getDate());

    if (appointmentsDates.includes(date.value)) {
      console.log("blaaa",date.getYear);
      const thisAppoint = appointments.find((appoint) => { appoint.date == date });
      remarks = thisAppoint.status;
    }
    return <div style={{ color: 'green', width: '100%', height: '100%' }}>{remarks}</div>;
  };
  return (
    <div>
      <Calendar
        // nextLabel='month>>'
        defaultValue={date}

        onChange={handleDateChange}
        value={date}
        // className={`${date}`}
        tileDisabled={tileDisabled}
        tileContent={tileContent}
        tileClassNam={{ date }}
      />

      {date && ( // Display TimePicker only if date is selected
        <TimePicker
          onChange={handleTimeChange}
          value={time}
          disableClock={true}
          hourPlaceholder="hh"
          minutePlaceholder="mm"

        />

      )}
      <p>Selected date and time: {date.toDateString()} - {time}</p>
    </div>
  );
};

export default CalendarComponent;












