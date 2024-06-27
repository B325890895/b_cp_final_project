const { Controller } = require("./Controller");
const AppointmentService = require('../../services/Appointment.service');
class AppointmentController extends Controller {
    constructor(service) {
        super(service)
    }
    async read(req, res, next) {
        let params ={}
        if(req.params.userName!=undefined){params.userName = req.params.userName};
        if(req.params.filter)params.filter = req.params.filter;
        try {
            console.log(req.params.filter, req.params.userName,params);
            const response = await this.service.read(params);
            return res.status( response.statusCode ).json( response.json );
        } catch (error) {
            next(error);
        }
    }
    async delete(req, res, next){ 
        try {
            const response = await this.service.delete(req.params);
            return res.status(response.statusCode);
        } catch (error) {
            next(error);
        }
    }
}
module.exports = new AppointmentController(AppointmentService);