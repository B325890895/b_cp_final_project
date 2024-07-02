const { Controller } = require("./Controller");
const AppointmentService = require('../../services/Appointment.service');
class AppointmentController extends Controller {
    constructor(service) {
        super(service)
    }
    async read(req, res, next) {
        let params = {};
        if (req.params.filter1) params.filter1 = req.params.filter1;
        if (req.params.filter2) params.filter2 = req.params.filter2;
        console.log(params);
        try {
            const response = await this.service.read(params);
            return res.status(response.statusCode).json(response.json);
        } catch (error) {
            next(error);
        }
    }
    async delete(req, res, next) {
        try {
            const response = await this.service.delete(req.params);
            return res.status(response.statusCode).json(response.json);
        } catch (error) {
            next(error);
        }
    }
}
module.exports = new AppointmentController(AppointmentService);