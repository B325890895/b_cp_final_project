
import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import 'react-time-picker/dist/TimePicker.css';
import CancelingAppointment from '../components/Canceling Appointment';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Loading from '../components/Loading';
import Error from '../components/Error';
import { Typography, Box } from '@mui/material';
import Stack from '@mui/material/Stack';


function CalenderManager() {
    const userId = useParams().id;
    const URL_API = 'http://localhost:3000';
    const [date, setDate] = useState(new Date());
    const [time, setTime] = useState(null);
    const [showAppoint, setShowAppoint] = useState(null);
    const [thisMonthAppointments, setThisMonthAppointments] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [fetchError, setFetchError] = useState(null);

    useEffect(() => {
        setTime(null);
    }, [date]);

    useEffect(() => {
        if (thisMonthAppointments.length > 0) {
            setIsLoading(false);
        }
    }, [thisMonthAppointments]);

    useEffect(() => {
        getAppointmentsInThisMonth(date.getMonth() + 1, date.getFullYear());
    }, []);

    async function getAppointmentsInThisMonth(month, year) {
        setIsLoading(true);
        const filter1 = "*";
        const dateFormat = encodeURIComponent(`${month}/${year}`);
        try {
            const response = await fetch(`${URL_API}/appointment/${filter1}/${dateFormat}`);
            if (!response.ok) {
                throw new Error("Did not receive expected data");
            }
            const result = await response.json();
            setThisMonthAppointments(result);
        } catch (err) {
            setFetchError(err.message);
        } finally {
            setIsLoading(false);
        }
    }

    function handleDateChange(newDate) {
        setDate(newDate);
        // No need to call onDateChange(newDate);
    }

    function dayClick(date) {
        const thisDayAppointments = getThisAppointments(date);
        if (thisDayAppointments.length > 0) {
            setShowAppoint(thisDayAppointments);
        } else {
            setShowAppoint(null);
        }
    }

    function handleTimeChange(newTime) {
        setTime(newTime);
    }

    function tileDisabled({ date, view }) {
        if (view === 'month') {
            const today = new Date();
            return date < today.setHours(0, 0, 0, 0);
        }
        return false;
    }

    function tileContent({ date }) {
        const thisDayAppointments = getThisAppointments(date);
        if (thisDayAppointments.length === 0) return null;

        return (
            <>
                {thisDayAppointments.map((appoint, index) => (
                    <Typography key={index} variant="h6">
                        {userId === "manager" ? (
                            <>
                                {appoint.userName} - {appoint.hour}
                                {appoint.status === 0 && <> התור בוטל</>}
                            </>
                        ) : (
                            <>
                                {appoint.hour}
                                {appoint.status === 0 && <> התור בוטל</>}
                            </>
                        )}
                    </Typography>
                ))}
            </>
        );
    }

    function getThisAppointments(date) {
        const thisDay = date.getDate();
        const thisMonth = date.getMonth() + 1;
        const thisYear = date.getFullYear();
        const monthFull = thisMonth < 10 ? '0' + thisMonth : thisMonth;
        return thisMonthAppointments.filter(appoint =>
            appoint && appoint.date === `${thisDay}/${monthFull}/${thisYear}`
        );
    }

    return (
        <>
            {fetchError && <Error />}
            {isLoading && <Loading />}
            {!fetchError && !isLoading && (
                <Calendar
                    defaultValue={date}
                    onChange={handleDateChange}
                    onClickDay={dayClick}
                    onActiveStartDateChange={({ activeStartDate }) => {
                        setShowAppoint(null);
                        getAppointmentsInThisMonth(activeStartDate.getMonth() + 1, activeStartDate.getFullYear());
                    }}
                    value={date}
                    tileDisabled={tileDisabled}
                    tileContent={tileContent}
                />
            )}
            {showAppoint && (
                <Box mt={2} p={2} border={1} borderRadius={4}>
                    {showAppoint.map((appoint, index) => (
                        <Typography key={index} variant="h6">
                            {(
                                <div dir="rtl">
                                    <strong>שם לקוח:</strong> {appoint.userName}<br />
                                    <strong>ת.ז.:</strong> {appoint.user_id}<br />
                                    <strong>שעה:</strong> {appoint.hour}<br />
                                    {appoint.status === 0 && <> התור בוטל</>}
                                </div>
                            )}
                        </Typography>
                    ))}
                </Box>
            )}
        </>
    );
}

export default CalenderManager;


