const { Service } = require("./Service");
const AppointmentRepository = require("../repository/Appointment.repository");
const { DataSecurity } = require("./dataSecurity");
class AppointmentService extends Service {
  constructor(repository) {
    super(repository);
  }

}
module.exports = new AppointmentService(AppointmentRepository);
