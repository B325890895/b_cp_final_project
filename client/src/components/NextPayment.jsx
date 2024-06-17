import React from "react";
import moment from 'moment';
import info from '../assets/currentUserInfo.json'

const currentMonth =Number( moment().format('MM'))+1;
const currentYear = moment().format('YYYY');
const dateToNextPay=`01/${currentMonth}/${currentYear}`
function NextPayment() {
  return (<>
  <div>
    התשלום הבא בתאריך {dateToNextPay}
    </div>
    </>);
}

export default NextPayment;