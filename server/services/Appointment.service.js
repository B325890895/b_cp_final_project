const { Service } = require("./Service");
const AppointmentRepository = require("../repository/Appointment.repository");
const { DataSecurity } = require("./dataSecurity");
const {
  addWeeks,
  setDay,
  startOfWeek,
} = require("date-fns");
const userInfo = require("./User.service");
const CanceledAppointment = require("./CanceledAppointment.service");
class AppointmentService extends Service {
  constructor(repository) {
    super(repository);
  }
  async read(params) {
    if (params.filter1 && params.filter2 == "next") {
      const userInformation = await userInfo.read(params.filter1);
      if (!userInformation) {
        throw new Error("User not found");
      }
      //לעדכן את מערך תורים מבוטלים
      let dateNextAppointment = this.getDate(
        userInformation.day,
        userInformation.hour,
        new Date()
      );
      let appointmentWithDay = {
        user_id: params.filter1,
        userName:userInformation.userName,
        day: this.translateDay(userInformation.day),
        hour: userInformation.hour,
        date: "",
        status: 1,
        dateCenceled: [],
      };
      while (
        userInformation.canceledAppointments.includes(dateNextAppointment)
      ) {
        appointmentWithDay.dateCenceled.push(dateNextAppointment);
        let [day, month, year] = dateNextAppointment.split("/").map(Number);
        let date = new Date(year, month - 1, day + 7);
        date.setDate(date.getDate() + 1);
        dateNextAppointment = this.getDate(
          userInformation.day,
          userInformation.hour,
          date
        );
      }
      appointmentWithDay.date = dateNextAppointment;
      return { statusCode: 200, dateNextAppointment: appointmentWithDay };
    }

    return { statusCode: 500 };
  }
  async delete(params) {
    const regexDate = /^(0?[1-9]|[12][0-9]|3[01])\/(0?[1-9]|1[012])\/\d{4}$/;
    if (params.filter1 && regexDate.test(params.filter2)) {
      let hoursUntilTheAppointment = await this.getHoursBetweenDates(params.filter2);
      let userInformation;
      if (hoursUntilTheAppointment >= 24) {
        userInformation = await userInfo.updatecanCeledAppointments(
          params.filter1,
          params.filter2
        );

      } else if (
        hoursUntilTheAppointment < 24 &&
        hoursUntilTheAppointment >= 4
      ) {
        userInformation = await userInfo.updateCanceledAppointments(
          params.filter1,
          params.filter2
        );
        //to add the appointment to appointment collection
        const addAppointmentToCollection = await this.repository.create({
          "user_id": params.filter1,
          "date": params.filter2,
          "status": 0
        });
      } else if (hoursUntilTheAppointment < 4) {
        return { statusCode: 500 };
      }

      if (userInformation.statusCode != 200 && addAppointmentToCollection.statusCode != 200) {
        return { statusCode: 500 };
      }
      return { statusCode: 200 };
    } else {
      return { statusCode: 500 };
    }
  }

  getDate(dayName, hour, currentDate) {
    console.log(dayName, hour, currentDate);
    const now = currentDate;
    const arrayDayOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday",];
    const today = now; // לקבוע את היום הראשון של השבוע
    const dayOfWeek = arrayDayOfWeek.indexOf(dayName);
    const [hourOfAppointment, minuteshourOfAppointment] = hour.split(":").map(Number);
    if (dayOfWeek === -1) {
      throw new Error("Invalid day name");
    }
    let nextOccurrence = setDay(today, dayOfWeek);
    if (!(dayOfWeek + arrayDayOfWeek.indexOf(now.getDay()) < 7)) {
      today = startOfWeek(now);
      if ((nextOccurrence.getDate() == now.getDate() && hourOfAppointment < now.getHours() + 1) ||
        nextOccurrence.getDate() < now.getDate()
      ) {
        nextOccurrence = addWeeks(nextOccurrence, 1);
      }

    }
    if (
      nextOccurrence.getDate() == now.getDate() &&
      hourOfAppointment < now.getHours() + 1
    ) {
      nextOccurrence = addWeeks(nextOccurrence, 1);
    }
    return nextOccurrence.toLocaleDateString("en-GB");
  }

  translateDay(day) {
    const days = {
      Sunday: "ראשון",
      Monday: "שני",
      Tuesday: "שלישי",
      Wednesday: "רביעי",
      Thursday: "חמישי",
      Friday: "שישי",
      Saturday: "שבת",
    };
    return days[day] || "יום לא תקין";
  }

  async getHoursBetweenDates(futureDate) {
    const [day, month, year] = futureDate.split("/").map(Number);
    const futureDateFormatDate = new Date(year, month - 1, day);
    const now = new Date();
    const difference = futureDateFormatDate - now.getTime();
    const hoursDifference = difference / (1000 * 60 * 60);
    return Math.round(hoursDifference * 100) / 100;
  }
}

module.exports = new AppointmentService(AppointmentRepository);
