const { query } = require("express");
const Repository = require("./Repository");
const { default: mongoose } = require("mongoose");
const passwordConnection = process.env.CONNECTION_URL;
const passwordModel = require("./models/User.model");
class PasswordRepository extends Repository {
  constructor(connection, model) {
    super(connection, model);
  }
  async create(data) {
    let object = await this.model.create(data);
    if (object)

        return {json:true,statusCode:200};
    return {json:false,statusCode:500};
}

}

module.exports = new PasswordRepository(passwordConnection, passwordModel);
