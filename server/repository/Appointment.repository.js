const { query } = require("express");
const Repository = require("./Repository");
const { default: mongoose } = require("mongoose");
const apoointmentConnection = process.env.CONNECTION_URL;
const appointmentModel = require("./models/Appointment.model");
class AppointmentRepository extends Repository {
  constructor(connection, model) {
    super(connection, model);
  }

  async readAll() {
    //the name of the function that reads all the data
    let objects = await this.model.readAll();
    if (objects)
      return objects;
    throw new Error("Couldn't read all");
  }
  async read(userName, date, hour) {
    date = date.toLocaleDateString('en-GB');
    console.log("repository", userName, date, hour);
    if (date) {
      const appointment = await this.model.findOne({ userName: userName, date: date, hour: hour });
      console.log(appointment);
      if (appointment) return appointment;
      throw new Error("Could not find object with id " + id);
    }
    console.log('repository', date);
    // let appointment = await this.model.findOne({ userName: myUserName });
    // console.log(appointment);
    // if (appointment) return appointment;
    // throw new Error("Could not find object with id " + id);
  }

  async update(id, data) {
    let object = await this.model.updateOne({ user_id: id }, { $set: data });
    if (object)
      return object;
    throw new Error('Could not find object with id' + data.id);

  }
  async delete(userName,date) {
    console.log(userName, date);
    let object = await this.model.deleteOne({ userName: userName, date: date });
    if (object)
      return {statusCode:200};
    return {statusCode:500}
  }
  async exist(id) {
    const doesObjectExist = await this.model.exists({ user_id: id })
    if (doesObjectExist)
      return true;
    return false;
  }

}

module.exports = new AppointmentRepository(apoointmentConnection, appointmentModel);
