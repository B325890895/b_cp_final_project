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
      const userInformation = await userInfo.read(params.userName);
      if (!userInformation) {
        throw new Error('User not found');
      }
      let dateNextAppointment = this.getDate(userInformation.day, userInformation.hour, new Date());
      let appointmentWithDay = {
        userName: params.userName,
        day: this.translateDay(userInformation.day),
        hour: userInformation.hour,
        date: "",
        status: 1,
        dateCenceled: []
      };
      console.log(dateNextAppointment);
      while (userInformation.canceledAppointments.includes(dateNextAppointment)) {
        appointmentWithDay.dateCenceled.push(dateNextAppointment);
        let [day, month, year] = dateNextAppointment.split('/').map(Number);
        let date = new Date(year, month - 1, day+7);
        date.setDate(date.getDate() + 1);
        dateNextAppointment = this.getDate(userInformation.day, userInformation.hour, date);
        console.log(dateNextAppointment);
      }
      appointmentWithDay.date = dateNextAppointment;
      return { "statusCode": 200, "dateNextAppointment": appointmentWithDay };
    }
    return { statusCode: 500 }
  }
  async delete(params) {
    const regexDate = /^(0?[1-9]|[12][0-9]|3[01])\/(0?[1-9]|1[012])\/\d{4}$/;
    if (params.userName && regexDate.test(params.filter)) {
      // const res = await this.repository.delete(params.userName, params.filter);
      // if (res.statusCode === 200) {
      const userInformation = await userInfo.updatecanCeledAppointments(params.userName, params.filter);
      if (userInformation.statusCode != 200) {
        return { statusCode: 500 }
      }
      return { statusCode: 200 }
    }
    else {
      return { statusCode: 500 }
    }
  }

  getDate(dayName, hour, currentDate) {
    const now = currentDate;
    const arrayDayOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const today = now // לקבוע את היום הראשון של השבוע
    const dayOfWeek = arrayDayOfWeek.indexOf(dayName);
    const [hourOfAppointment, minuteshourOfAppointment] = hour.split(':').map(Number);
    if (dayOfWeek === -1) {
      throw new Error('Invalid day name');
    }
    let nextOccurrence = setDay(today, dayOfWeek);
    if (!((dayOfWeek + arrayDayOfWeek.indexOf(now.getDay())) < 7)) {
      today = startOfWeek(now);
      if (((nextOccurrence.getDate() == now.getDate()) && (hourOfAppointment < now.getHours() + 1)) || (nextOccurrence.getDate() < now.getDate())) {
        console.log("aaaa");
        nextOccurrence = addWeeks(nextOccurrence, 1);
      }
      console.log(nextOccurrence.getDate(), now.getDate(), hourOfAppointment, now.getHours());

    }
    if (((nextOccurrence.getDate() == now.getDate()) && (hourOfAppointment < now.getHours() + 1))) {
      console.log("aaaa");
      nextOccurrence = addWeeks(nextOccurrence, 1);
    }
    console.log(nextOccurrence);
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


