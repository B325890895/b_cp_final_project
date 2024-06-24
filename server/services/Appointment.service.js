const { Service } = require("./Service");
const AppointmentRepository = require("../repository/Appointment.repository");
const { DataSecurity } = require("./dataSecurity");
class AppointmentService extends Service {
  constructor(repository) {
    super(repository);
  }
  async read(params) {
    if (params.userName && params.filter) {
      return await this.repository.read(params.userName, params.filter);
    }
  }
}
module.exports = new AppointmentService(AppointmentRepository);
