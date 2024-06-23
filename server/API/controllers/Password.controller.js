const {Controller} = require("./Controller");
const PasswordService = require('../../services/Password.service');
class PasswordController extends Controller {
    constructor(service) {
        super(service)
       
    }
}
module.exports = new PasswordController(PasswordService);