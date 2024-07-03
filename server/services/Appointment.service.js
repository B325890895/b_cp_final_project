const { Service } = require("./Service");
const AppointmentRepository = require("../repository/Appointment.repository");
const userService = require("./User.service");
const { DataSecurity } = require("./dataSecurity");

const userInfo = require("./User.service");
const CanceledAppointment = require("./CanceledAppointment.service");
class AppointmentService extends Service {
  constructor(repository) {
    super(repository);
  }
  async read(params) {
    const regex = /^(0?[1-9]|1[0-2])\/(2000|200[1-9]|201[0-9]|202[0-5])$/;
    if (params.filter1 && params.filter2 == "next") {
      console.log(params.filter1);
      const userInformation = await this.getUserInfo(params.filter1);
      console.log(userInformation.json.userName, "userInformation.userName");
      if (!userInformation) {
        return { statusCode: 500 }
      }
      //לעדכן את מערך תורים מבוטלים
      let appointmentWithDay = {
        user_id: params.filter1,
        userName: userInformation.json.userName,
        day: userInformation.json.day,
        hour: userInformation.json.hour,
        date: "",
        status: 1,
        dateCanceled: [],
      };
      const dateNextAppointment = this.getDate(userInformation, appointmentWithDay);
      appointmentWithDay.date = dateNextAppointment;
      return { statusCode: 200, json: appointmentWithDay };
    }
    if (params.filter1 && regex.test(params.filter2)) {
      const [month, year] = params.filter2.split('/');
      let appointmentsWithDay = []
      if (params.filter1 == "*") {
        const usersResponse = await userService.readAll();
        const users = usersResponse.json;
        const appointmentsAtMonthPromises = users.map(async (user) => {
          await this.getUserAppointmentsAtMonth(user.user_id, month, year, appointmentsWithDay)
        })
        await Promise.all(appointmentsAtMonthPromises);
        return { statusCode: 200, json: appointmentsWithDay };
      }
      else {
       const response=await this.getUserAppointmentsAtMonth(params.filter1, month, year, appointmentsWithDay);
       console.log(response,"hiiii");
       return { statusCode: 200, json: response}
      }
    }
    return { statusCode: 500 };
  }
  async delete(params) {
    const regexDate = /^(0?[1-9]|[12][0-9]|3[01])\/(0?[1-9]|1[012])\/\d{4}$/;
    if (params.filter1 && regexDate.test(params.filter2)) {
      let hoursUntilTheAppointment = await this.getHoursBetweenDates(params.filter2);
      let userInformation;
      let addAppointmentToCollection;
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
        addAppointmentToCollection = await this.repository.create({
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

  getDate(userInformation, appointmentWithDay) {
    userInformation = userInformation.json;
    const [hours, minutes] = userInformation.hour.split(':').map(Number);
    const currentDate = new Date();
    let datesAtThisDay = this.getDates(currentDate.getFullYear(), currentDate.getMonth() + 1, userInformation.day);
    let dateNextAppointment = datesAtThisDay.find((date) => {
      const [day, month, year] = date.split('/').map(Number);
      const dateAppointment = new Date(year, month - 1, day, hours, minutes);
      if (dateAppointment > currentDate) {
        if (userInformation.canceledAppointments.includes(date)) {
          appointmentWithDay.dateCenceled.push(date);
        }
        else{
          return date;
        }
          
      }
    })
    while (!dateNextAppointment) {
      datesAtThisDay = this.getDates(currentDate.getFullYear(), currentDate.getMonth() + 1, userInformation.day);
      dateNextAppointment = datesAtThisDay.map((date) => {
        const [day, month, year] = date.split('/').map(Number);
        const dateAppointment = new Date(year, month - 1, day, hours, minutes);
        if (dateAppointment > currentDate)
          console.log(dateAppointment, "dateAppointment");
        return dateAppointment;
      })
    }
    console.log(dateNextAppointment, "dateNextAppointment");
    return dateNextAppointment;
  }

  // translateDay(day) {
  //   console.log(day, "day");
  //   const days = {
  //     Sunday: "ראשון",
  //     Monday: "שני",
  //     Tuesday: "שלישי",
  //     Wednesday: "רביעי",
  //     Thursday: "חמישי",
  //     Friday: "שישי",
  //     Saturday: "שבת",
  //   };
  //   return days[day] || "יום לא תקין";
  // }

  async getHoursBetweenDates(futureDate) {
    const [day, month, year] = futureDate.split("/").map(Number);
    const futureDateFormatDate = new Date(year, month - 1, day);
    const now = new Date();
    const difference = futureDateFormatDate - now.getTime();
    const hoursDifference = difference / (1000 * 60 * 60);
    return Math.round(hoursDifference * 100) / 100;
  }
  async getUserInfo(userId) {
    console.log("user info user id: " + userId);
    const userInformation = await userInfo.read(userId);
    if (!userInformation) {
      throw new Error("User not found");
    }
    return userInformation;
  }
  getDates(year, month, dayOfWeek) {
    const arrayDayOfWeek = ["ראשון", "שני", "שלישי", "רביעי", "חמישי", "שישי", "שבת"];
    const dates = [];
    const date = new Date(year, month - 1, 1);
    const newDate = new Date(date);
    for (let i = 1; i < 30; i++) {
      newDate.setDate(newDate.getDate() + 1)
      if (newDate.getDay() == arrayDayOfWeek.indexOf(dayOfWeek)) {
        break;
      }
    }
    date.setDate(newDate.getDate())
    // להוסיף את כל הימים המתאימים לחודש
    for (let i = 0; i < 5; i++) {
      if ((date.getMonth() + 1) != month) {
        break;
      }
      console.log(date.getDate(), "187");
      const dateString = `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear()}`;
      dates.push(dateString);
      date.setDate(date.getDate() + 7);
    }
    console.log(dates.length, "dates.length");
    return dates;
  }
  async getUserAppointmentsAtMonth(userId, month, year, appointmentsWithDay) {
    const userInformation = (await this.getUserInfo(userId)).json;
    const dates = this.getDates(year, month, userInformation.day);
    console.log(userInformation);
    let thisStatus = 1;
    await dates.map((date) => {
      thisStatus = 1;
      if (userInformation.canceledAppointments.includes(date)) {
        thisStatus = 0;
      }
      appointmentsWithDay.push({
        user_id: userInformation.user_id,
        userName: userInformation.userName,
        day: userInformation.day,
        hour: userInformation.hour,
        date: date,
        status: thisStatus,
      })
    })
    return appointmentsWithDay
  }
}

module.exports = new AppointmentService(AppointmentRepository);
