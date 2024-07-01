const {Controller} = require("./Controller");
const paymentService = require('../../services/Payment.service');
class PaymentController extends Controller {
    constructor(service) {
        super(service)
    }
}
module.exports = new PaymentController(paymentService);