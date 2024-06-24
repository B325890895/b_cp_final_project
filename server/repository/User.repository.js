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
    //the name of the function that reads all the data
    let objects = await this.model.readAll();
    if (objects)
      return objects;
    throw new Error("Couldn't read all");
  }
  async read(userName, filter) {
    if (userName && filter == "next") {
      let currentDate = new Date();
      let user = await this.model.findOne({
        username: userName,
        date: { $gt: currentDate }
      }).sort({ date: 1 }); // מיון לפי תאריך בסדר עולה
      if (user) return user;
      throw new Error("Could not find object with username " + userName + " and upcoming date");
    }
    let user = await this.model.findOne({ user_id: id });
    if (user) return user;
    throw new Error("Could not find object with id " + id);
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
  async exist(id) {
    const doesObjectExist = await this.model.exists({ user_id: id })
    if (doesObjectExist)
      return true;
    return false;
  }

}

module.exports = new UserRepository(userConnection, userModel);
