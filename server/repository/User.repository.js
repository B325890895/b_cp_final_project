const { query } = require("express");
const Repository = require("./Repository");
const { default: mongoose } = require("mongoose");
const userConnection = process.env.CONECTION_URL;
const userCollection = "users";
//const userDataBaseName=process.env.DATABASE_NAME
const userModel = require("./models/User.model");
class UserRepository extends Repository {
  constructor(connection, collection, model) {
    console.log("UserRepository constructor");
    super(connection, collection, model);
  }

  async read(id) {
    let user = await this.model.findOne({ user_id: id });
    console.log(user);
    if (user) return user;
    throw new Error("Could not find object with id " + id);
  }

  async update(id,data) {
    let object = await this.model.updateOne({  user_id: id }, { $set: data });
    if (object)
        return object;
    throw new Error('Could not find object with id'+ data.id);

}

}

module.exports = new UserRepository(userConnection, userCollection, userModel);
