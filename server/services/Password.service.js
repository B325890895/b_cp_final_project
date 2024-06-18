const bcrypt = require('bcrypt');
const { Service } = require("./Service");
const passwordRepository = require("../repository/Password.repository");
const { DataSecurity } = require("./dataSecurity");
class passwordService extends Service {
  constructor(repository) {
    super(repository);
  }
  async create(passwordInfo) {

    if(!ssxDataSecurity(passwordInfo)){
      return {statusCode:400}
    }
    //validation to email and user name
    if(!validation(userName,email))
      return {statusCode:400}
    const password = generatePassword(8);
    console.log(password);
    const hashPassword =bcrypt.hash(password);
    const response=this.repository.create({userName:passwordInfo.userName, password:hashPassword})
    if (response.json) {
       sendEmail(passwordInfo.email, passwordInfo.userName,password);
       return response
    }else{
      return {statusCode:500}
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

async sendEmail(toEmail,userName, password) {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
               
            }
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: toEmail,
            subject: "",
            text: `ברכותינו,\n החשבון שלך לאתר של בת שבע כ"ץ נוצר \n
            שם המשתמש שלכם הוא:${userName}\n הסיסמא שלכם היא:#${password}\n`
        };
        try {
            await transporter.sendMail(mailOptions);
            console.log('Email sent successfully!');
        } catch (error) {
            console.error('Failed to send email:', error);
        }
    }
}
function validation(userName,email){
  if(!(userName.length > 0)&&(/^[\u0590-\u05FF\s]*$/.test(str)||/^[a-zA-Z\s]*$/.test(str))&& (email.length > 0) && (/\S+@\S+\.\S+/.test(email)) )
    return false;
  return true;
}
module.exports = new passwordService(passwordRepository);
