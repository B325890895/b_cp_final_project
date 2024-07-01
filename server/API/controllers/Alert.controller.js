const { Controller } = require("./Controller");
const alertService = require('../../services/User.service');
const cenceledAppointment = require('../../services/CanceledAppointment.service');
class AlertController extends Controller {
    constructor(service) {
        super(service)
    }
    async read(req, res, next) {
        try {
            if (req.params.filter) {
                const response = await cenceledAppointment.read(req.params.filter);
                return res.status(response.statusCode).json(response.json);
            }
            if (req.params.id) {
                const response = await alertService.read(req.params.filter);
                return res.status(response.statusCode).json(response.json);
            }
        } catch (error) {
            next(error);
        }
    }
    async delete(req, res, next) {
        try {
            console.log("controller");
            const response = await cenceledAppointment.delete(req.params.filter1, req.params.filter2);
            return res.status(response.statusCode).json(response.json);
        } catch (error) {
            next(error);
        }

    }
}
module.exports = new AlertController(alertService);