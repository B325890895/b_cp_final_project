const bcrypt = require('bcrypt');
const { query } = require("express");
const Repository = require("./Repository");
const { default: mongoose } = require("mongoose");
const passwordConnection = process.env.CONNECTION_URL;
const passwordModel = require("./models/Password.model");
class PasswordRepository extends Repository {
  constructor(connection, model) {
    super(connection, model);
  }
  async create(data) {
    let object = await this.model.create(data);
    if (object)
      return { json: true, statusCode: 200 };
    return { json: false, statusCode: 500 };
  }
  async read(userName, password) {
    let object = await this.model.findOne({ userName: userName });
    console.log("read", object);
    if (object) {
      try {
        const result = await bcrypt.compare(password, object.password);
        if (result) {
          console.log('סיסמה נכונה');
          return { json: true, statusCode: 200 };
        } else {
          console.log('סיסמה שגויה');
          return { json: false, statusCode: 500 };
        }
      } catch (err) {
        console.error(err);
        throw new Error('Error comparing passwords');
      }
    }
    else {
      throw new Error('userName does not exsist');
    }
  }
  async delete(userName) {
    console.log(userName);
    try {
      const result = await this.model.deleteOne({ userName: userName });
      console.log('User deleted successfully:', result);
      return { json: true, statusCode: 200 };
    } catch (err) {
      console.log('delete Error:', err);
      return { json: false, statusCode: 500 };
    }

  }
}

module.exports = new PasswordRepository(passwordConnection, passwordModel);
