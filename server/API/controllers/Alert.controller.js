const {Controller} = require("./Controller");
const alertService = require('../../services/User.service');
class AlertController extends Controller {
    constructor(service) {
        super(service)
    }
}
module.exports = new AlertController(alertService);