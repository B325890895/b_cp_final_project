const { Service } = require("./Service");
const userRepository = require("../repository/User.repository");
const { DataSecurity } = require("./dataSecurity");
class usersService extends Service {
  constructor(repository) {
    super(repository);
  }

  async create(userInfo) {
    if (this.repository)
      try {
        // if (!DataSecurity.ssx(userInfo)) {
        //   console.log("error");
        //   throw new Error(400);
        // }
        for (const key in userInfo) {
          if (Object.hasOwnProperty.hasOwnProperty(key)) {
            if (!this.inputValidity(key, userInfo[key])) throw new Error(400);
          }
        }
      }
      catch (err) {
        throw new Error(400);
      }
    try {
      let userExist = await this.repository.exist(userInfo.user_id)
      if (!(userExist))
        return this.repository.create(userInfo);
      throw new Error("user already exists");
    }
    catch (err) {
      console.log(err);
      throw new Error(500);
    }
  }

  async delete(id) {
    super.delete(id);
    // if (this.repository) {
    //   try {
    //     let userExist = await this.repository.exist(userInfo.user_id)
    //     if ((userExist))
    //       return this.repository.delete(userId);
    //     throw new Error("user is not exists");
    //   } 
    //   catch (err) {
    //     console.log(err);
    //     throw new Error(500);
    //   }
    // }

  }
  async read(user_id) {
    try {
      return await this.repository.read(user_id);
    }
    catch (err) {
      console.log(err);
      return { statusCode: 500 }
    }
  }
  async updatecanCeledAppointments(user_id, date) {
    try {
      return this.repository.updateCanceledAppointments(user_id, date);
    }
    catch (err) {
      console.log(err);
      throw new Error(500);
    }
  }
}
module.exports = new usersService(userRepository);
