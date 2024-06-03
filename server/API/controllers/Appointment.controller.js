const {Controller} = require("./Controller");
const AppointmentService = require('../../services/Appointment.service');
class AppointmentController extends Controller {
    constructor(service) {
        super(service)
    }
}
module.exports = new AppointmentController(AppointmentService);