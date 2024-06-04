import React from "react";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import dayjs from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';

  // const [value, setValue] = React.useState(dayjs('2022-04-17'));
function Calendar() {
  return (<>
   {/* <DateCalendar defaultValue={dayjs('2022-04-17')} /> */}
   {/* <DateCalendar value={value} onChange={(newValue) => setValue(newValue)} /> */}
   <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DateCalendar', 'DateCalendar']}>
        <DemoItem label="Uncontrolled calendar">
          <DateCalendar defaultValue={dayjs('2022-04-17')}views={['day']} onClick={(newValue)=>{alert({newValue})}} />
        </DemoItem>
      </DemoContainer>
    </LocalizationProvider>
  </>
  );
}

export default Calendar;