const Repository = require("./Repository");
const connection = process.env.CONNECTION_URL;
const CanceledAppointmentModel = require("./models/CanceledAppointment.model");
class AppointmentRepository extends Repository {
    constructor(connection, model) {
        super(connection, model);
    }
    async readAll() {
        return await this.model.find({ });

    }
    async read(params) {
        return await this.model.findOne({ userName: params.userName });
    }

    async delete(userName, date) {
    }
}

module.exports = new AppointmentRepository(connection, CanceledAppointmentModel);
