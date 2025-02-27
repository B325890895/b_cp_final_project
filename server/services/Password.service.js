const bcrypt = require("bcrypt");
const { Service } = require("./Service");
const passwordRepository = require("../repository/Password.repository");
const { DataSecurity } = require("./dataSecurity");
const nodemailer = require("nodemailer");

class passwordService extends Service {
  constructor(repository) {
    super(repository);
  }
  async create(userName,newPassword) {
    console.log(userName,newPassword);
    if (!this.validation(userName,newPassword))
      return { statusCode: 400 };
    let salt = await bcrypt.genSalt(4);
    const hashPassword = await bcrypt.hash(newPassword,salt);
    const response = await this.repository.create({
      userName: userName,
      password: hashPassword,
    });
    if (response.json) {
      return response;
    } else {
      return { statusCode: 500 };
    }
  }

  async read(userName, password) {
    //
    const login = await this.repository.read(userName, password);
    if (login.json) {
    if(userName=="204203038"){
      //declare the user is manager
      login.json.userState="manager"
    }else{
      //declare the user is regular user
      login.json.userState="client"
    }
      return login;
    } else {
      return login;
    }
  }
  async delete(userName) {
    const response = await this.repository.delete(userName);
    if (response.json) {
      return response;
    } else {
      return { statusCode: 500 };
    }
  }


  validation(userName, email) {
    if (
      !(userName.length > 0) &&
      (/^[\u0590-\u05FF\s]*$/.test(str) || /^[a-zA-Z\s]*$/.test(str)) &&
      email.length > 0 &&
      /\S+@\S+\.\S+/.test(email)
    )
      return false;
    return true;
  }
  async checksIfExistsInPassword(userName) {
    const result= await this.repository.readByUserName(userName);
    console.log(result,"checksIfExistsInPassword");
    return result;
  }
}
module.exports = new passwordService(passwordRepository);
