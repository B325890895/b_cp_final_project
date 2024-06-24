const bcrypt = require('bcrypt');
const { Service } = require("./Service");
const passwordRepository = require("../repository/Password.repository");
const { DataSecurity } = require("./dataSecurity");
const nodemailer = require("nodemailer");

class passwordService extends Service {
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
      return { statusCode: 400 }
    // const password = generatePassword(8);
    const password = "password1111"
    let salt = 4;
    const hashPassword = await bcrypt.hash(password, salt);
    const response = await this.repository.create({ userName: passwordInfo.userName, password: hashPassword })
    if (response.json) {
      await this.sendEmail(passwordInfo.email, passwordInfo.userName, password);
      return response
    } else {
      return { statusCode: 500 }
    }
  }


  async read(userName, password) {
    const log = await this.repository.read(userName, password);
    if (log.json) {
      //token
      return log
    }
    else {
      return log
    }
  }

  async generatePassword(length) {
    const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
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
      service: 'gmail',
      auth: {
        user: "nbkslp1@gmail.com",
        pass: "awzd wail fyzo mwwq"

      }
    });

    const mailOptions = {
      // from: process.env.EMAIL_USER,
      from: "nbkslp1@gmail.com",
      to: "batyablau@gmail.com",
      subject: `ברכותינו,\n  החשבון שלך לאתר של בת שבע כ"ץ נוצר בהצלחה \n`,
      text:
        `שם המשתמש שלך הוא:${userName}\n הסיסמא שלך היא:#${password}\n`
    };
    try {
      await transporter.sendMail(mailOptions);
      console.log('Email sent successfully!');
    } catch (error) {
      console.error('Failed to send email:', error);
    }
  }
  validation(userName, email) {
    if (!(userName.length > 0) && (/^[\u0590-\u05FF\s]*$/.test(str) || /^[a-zA-Z\s]*$/.test(str)) && (email.length > 0) && (/\S+@\S+\.\S+/.test(email)))
      return false;
    return true;
  }
}
module.exports = new passwordService(passwordRepository);
