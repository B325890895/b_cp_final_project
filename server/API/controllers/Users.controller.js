const {Controller} = require("./Controller");
const usersService = require('../../services/User.service');
class UsersController extends Controller {
    constructor(service) {
        super(service)
    }
}
module.exports = new UsersController(usersService);