const { Service } = require("./Service");
const paymentRepository = require("../repository/Payment.repository");
const { DataSecurity } = require("./dataSecurity");
class paymentService extends Service {
  constructor(repository) {
    super(repository);
  }

}
module.exports = new paymentService(paymentRepository);
