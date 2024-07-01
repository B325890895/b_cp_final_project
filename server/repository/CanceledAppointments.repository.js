const Repository = require("./Repository");
const connection = process.env.CONNECTION_URL;
const CanceledAppointmentModel = require("./models/CanceledAppointment.model");
class AppointmentRepository extends Repository {
    constructor(connection, model) {
        super(connection, model);
    }
    async readAll() {
        const response = await this.model.find({});
        return response;

    }
    async read(userName) {
        return await this.model.findOne({ userName: userName });
    }

    async delete(userName, date) {
        return await this.model.deleteOne({ userName: userName, date: date });
    }
    async update(canceledAppointmentsUpdated) {
        try {
            console.log(canceledAppointmentsUpdated);
            await this.model.deleteMany({});
            const a = await this.model.find({});
            console.log(a,"a");
            await this.model.insertMany(canceledAppointmentsUpdated);
            const b = await this.model.find({});
            console.log(b,"b");
            return { statusCode: 200 }
        }
        catch (error) {
            return { statusCode: 500 }
        }

    }
}

module.exports = new AppointmentRepository(connection, CanceledAppointmentModel);
