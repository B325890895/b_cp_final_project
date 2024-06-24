const { Controller } = require("./Controller");
const PasswordService = require('../../services/Password.service');
class PasswordController extends Controller {
  constructor(service) {
    super(service)
  }
  async read(req, res, next) {
    const { userName } = req.params;
    const password = req.body.password;
    try {
      const response = await this.service.read(userName, password);
      return res.json(response);
    } catch (error) {
      next(error);
    }
  }
  async delete(req, res, next) {
    console.log(" deleting conroller...");
    let userName = req.body.userName;
    try {
      const response = await this.service.delete(userName);
      return res.json(response);
    } catch (error) {
      next(error);
    }
  }
}
module.exports = new PasswordController(PasswordService);