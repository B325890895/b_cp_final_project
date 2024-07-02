const bcrypt = require("bcrypt");
const { Service } = require("./Service");
const temporaryPasswordRepository = require("../repository/TemporaryPassword.repository");
const { DataSecurity } = require("./dataSecurity");
const nodemailer = require("nodemailer");
const passwordService= require("./Password.service")

class temporaryPasswordService extends Service {
  constructor(repository) {
    super(repository);
  }
  async create(passwordInfo) {
    console.log(passwordInfo);
    // if (!ssxDataSecurity(passwordInfo)) {
    //   return { statusCode: 400 }
    // }
    //validation to email and user name
    if (!this.validation(passwordInfo.userName, passwordInfo.email))
      return { statusCode: 400 };
    const password = await this.generatePassword(9);
    let salt = await bcrypt.genSalt(4);
    const hashPassword = await bcrypt.hash(password,salt);
    const response = await this.repository.create({
      userName: passwordInfo.userName,
      password: hashPassword,
    });
    if (response.json) {
      await this.sendEmail(passwordInfo.email, passwordInfo.userName, password);
      return response;
    } else {
      return { statusCode: 500 };
    }
  }

  async read(userName, password,newPassword) {
    const login = await this.repository.read(userName, password);
    if (login.json) {
      //create the new password in the password collection
      const createNewPassword = await passwordService.create(userName,newPassword)
      if(createNewPassword.json){
       //delete the old temporary password
       this.delete(userName)
        if(userName=="204203038"){
          //declare the user is manager
          login.json.userState="manager"
        }else{
          //declare the user is regular user
          login.json.userState="client"
        }
      }else{
        return {statusCode: 500}
      } 
      return login;
    } else {
      return {statusCode: 401, message:"user name or password not correct"};
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
  async generatePassword(length) {
    const charset =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let password = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      password += charset.charAt(randomIndex);
    }
    return password;
  }

  async sendEmail(toEmail, userName, password) {
    console.log("sendEmailFunction");
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from:process.env.EMAIL_USER,
      to: toEmail,
      subject: `ברכותינו,\n  החשבון שלך לאתר של בת שבע כ"ץ נוצר בהצלחה \n`,
      text: `שם המשתמש שלך הוא:${userName}\n הסיסמא שלך היא:#${password}\n`,
    };
    try {
      await transporter.sendMail(mailOptions);
      console.log("Email sent successfully!");
    } catch (error) {
      console.error("Failed to send email:", error);
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
}
module.exports = new temporaryPasswordService(temporaryPasswordRepository);
