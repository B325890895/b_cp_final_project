const { query } = require("express");
const Repository = require("./Repository");
const { default: mongoose } = require("mongoose");
const userConnection = process.env.CONNECTION_URL;
const userModel = require("./models/User.model");
class UserRepository extends Repository {
  constructor(connection, model) {
    super(connection, model);
  }

  async readAll() {
    let objects = await this.model.find({},'user_id userName');
    console.log(objects);
    if (objects)
      return {json: objects,statusCode: 200};
    throw new Error("Couldn't read all");
  }
  async read(user_id) {
    console.log("userrepository",user_id);
    try {
      return await this.model.findOne({ user_id: user_id });
    }
    catch (err) {
      console.log("user not found");
      return { json: false, statusCode: 500 };
    }
  }

  async update(id, data) {
    let object = await this.model.updateOne({ user_id: id }, { $set: data });
    if (object)
      return object;
    throw new Error('Could not find object with id' + data.id);

  }
  async delete(id) {
    console.log(id);
    let object = await this.model.deleteOne({ user_id: id });
    if (object)
      return object;
    throw new Error('Could not find object with id ' + id);
  }
  
  async updateCanceledAppointments(user_id, date) {
    let object = await this.model.updateOne(
      { user_id: user_id },
      { $push: { canceledAppointments: date} });
    if (object)
      return { statusCode: 200 };
    return { statusCode: 500 }

  }
}

module.exports = new UserRepository(userConnection, userModel);
