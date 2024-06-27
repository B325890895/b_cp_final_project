const { Controller } = require("./Controller");
const temporaryPasswordService = require('../../services/TemporaryPassword.service');
class TemporaryPasswordController extends Controller {
  constructor(service) {
    super(service)
  }
  async read(req, res, next) {
    const { userName } = req.params;
    const password = req.body.password;
    const newPassword =req.body.newPassword
    try {
      const response = await this.service.read(userName, password, newPassword);
      return res.status( response.statusCode ).json( response.json );
    } catch (error) {
      next(error);
    }
  }
  async delete(req, res, next) {
    let userName = req.body.userName;
    try {
      const response = await this.service.delete(userName);
      return res.status( response.statusCode ).json( response.json );
    } catch (error) {
      next(error);
    }
  }
}
module.exports = new TemporaryPasswordController(temporaryPasswordService);