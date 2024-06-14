import React from "react";
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
// import dayjs from 'dayjs';
// import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
// let dey;
// const [value, setValue] = React.useState(dayjs('2022-04-17'));
function Calendar() {
  return (
    <>
      {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={['DateCalendar', 'DateCalendar']}>
          <DemoItem label="Uncontrolled calendar">
            {<DateCalendar day={dayjs('2022-04-20')}
          /* slots={{
              day: ServerDay,
            }}
            slotProps={{
              day: {
                highlightedDays,
              },
            }} */
    //       /> }

    //     </DemoItem>
    //   </DemoContainer>
    // </LocalizationProvider> */}
      }</>
  );
}

export default Calendar;