const { Controller } = require("./Controller");
const AppointmentService = require('../../services/Appointment.service');
class AppointmentController extends Controller {
    constructor(service) {
        super(service)
    }
    async read(req, res, next) {
        let params ={}
        if(req.params.userName)params.userName = req.params.userName;
        if(req.params.filter)params.filter = req.params.filter;
        try {
            const response = await this.service.read(params);
            return res.json(response);
        } catch (error) {
            next(error);
        }
    }
}
module.exports = new AppointmentController(AppointmentService);