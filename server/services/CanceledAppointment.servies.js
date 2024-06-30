const { Service } = require("./Service");
const canceledAppointmentRepository = require("../repository/CanceledAppointments.repository");
const { parse, addDays, addWeeks, addMonths, getDay, setDay, startOfWeek } = require('date-fns');
class CanceledAppointmentServies extends Service {
    constructor(repository) {
        super(repository);
    }
    async read(userName) {
        if (userName == "manager") {
            const response = await canceledAppointmentRepository.readAll()
            if (response) {
                return { statusCode: 200, json: response };
            }
            return { statusCode: 500, json: {} };
        }

        const response = await canceledAppointmentRepository.read(userName)
        if (response) {
            return { statusCode: 200, json: response.json };
        }
        return { statusCode: 500, json: {} };
    }
    async delete(userName, date) {
        console.log("service");
        const response = await canceledAppointmentRepository.delete(userName, date);
        if (response) {
            return { statusCode: 200, json: response };
        }
        return { statusCode: 500, json: {} };
    }

}

module.exports = new CanceledAppointmentServies(canceledAppointmentRepository);


