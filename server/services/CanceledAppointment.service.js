const { Service } = require("./Service");
const canceledAppointmentRepository = require("../repository/CanceledAppointments.repository");
const { parse, addDays, addWeeks, addMonths, getDay, setDay, startOfWeek } = require('date-fns');
class CanceledAppointment extends Service {
  constructor(repository) {
    super(repository);
  }
  async read(params) {
    
 return canceledAppointmentRepository.read(params);
  }
  async readAll(){
    return canceledAppointmentRepository.readAll();
  }
 
}

module.exports = new AppointmentService(AppointmentRepository);


