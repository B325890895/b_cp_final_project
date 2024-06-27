const { Service } = require("./Service");
const AppointmentRepository = require("../repository/Appointment.repository");
const { DataSecurity } = require("./dataSecurity");
const { parse, addDays, addWeeks, addMonths, getDay, setDay, startOfWeek } = require('date-fns');
const userInfo = require('./User.service')

class AppointmentService extends Service {
  constructor(repository) {
    super(repository);
  }
  async read(params) {
    if (params.userName && params.filter == "next") {
      console.log("Reading user information for:", params.userName); // הוסף פלט לבדיקת הערך המועבר
      const userInformation = await userInfo.read(params.userName);
      if (!userInformation) {
        throw new Error('User not found');
      }
      let dateNextAppointment = this.getDate(userInformation.day, new Date());
      while (userInformation.canceledAppointments.includes(dateNextAppointment)) {
        let [day, month, year] = dateNextAppointment.split('/').map(Number);
        let date = new Date(year, month - 1, day);
        date.setDate(date.getDate() + 1);
        dateNextAppointment = this.getDate(userInformation.day, date);
        console.log(dateNextAppointment);
      }
      // const appointment = await this.repository.read(params.userName, dateNextAppointment, userInformation.hour);
      let appointmentWithDay = {
        userName: params.userName,
        day: this.translateDay(userInformation.day),
        hour: userInformation.hour,
        date: dateNextAppointment,
        status: 1
      };

      console.log(appointmentWithDay);
      return appointmentWithDay;
    }
  }
  async delete(params) {
    console.log("delete appointment", params);
    const regexDate = /^(0?[1-9]|[12][0-9]|3[01])\/(0?[1-9]|1[012])\/\d{4}$/;
    if (params.userName && regexDate.test(params.filter)) {
      // const res = await this.repository.delete(params.userName, params.filter);
      // if (res.statusCode === 200) {
      console.log("delete appointment service");
      const userInformation = await userInfo.updatecanCeledAppointments(params.userName, params.filter);
      if (!userInformation) {
        throw new Error('User not found');
      }
      return { statusCode: 200 }
    }
    else {
      return { statusCode: 500 }
    }
  }

  getDate(dayName,currentDate) {
    const now = currentDate;
    const dayOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].indexOf(dayName);
    if (dayOfWeek === -1) {
      throw new Error('Invalid day name');
    }
    const today = startOfWeek(now); // לקבוע את היום הראשון של השבוע
    let nextOccurrence = setDay(today, dayOfWeek);
    if (nextOccurrence <= now) {
      nextOccurrence = addWeeks(nextOccurrence, 1);
    }
    return nextOccurrence.toLocaleDateString('en-GB');
  }
  translateDay(day) {
    const days = {
      "Sunday": "ראשון",
      "Monday": "שני",
      "Tuesday": "שלישי",
      "Wednesday": "רביעי",
      "Thursday": "חמישי",
      "Friday": "שישי",
      "Saturday": "שבת"
    };
    return days[day] || "יום לא תקין";
  }
}

module.exports = new AppointmentService(AppointmentRepository);


