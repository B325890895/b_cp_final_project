const { Service } = require("./Service");
const canceledAppointmentRepository = require("../repository/CanceledAppointments.repository");
const { parse, addDays, addWeeks, addMonths, getDay, setDay, startOfWeek } = require('date-fns');
class CanceledAppointmentServies extends Service {
    constructor(repository) {
        super(repository);
    }
    async read(user_id) {
        if (user_id == "manager") {
            const response = await canceledAppointmentRepository.readAll()
            if (response) {
                const result = response.filter(appointment => this.isDatePassed(appointment.date));
                const responseUpdate = await canceledAppointmentRepository.update(result);
                console.log(responseUpdate.statusCode,"service","hiii");
                if (responseUpdate.statusCode!=200) {
                    console.log("not found");
                    return { statusCode: 500, json: {} };
                }
                console.log(response);
                return { statusCode: 200, json: response };
            }
            return { statusCode: 500, json: {} };
        }
        const response = await canceledAppointmentRepository.read(user_id);
        if (response) {
            return { statusCode: 200, json: response.json };
        }
        return { statusCode: 500, json: {} };
    }
    async delete(user_id, date) {
        const response = await canceledAppointmentRepository.delete(user_id, date);
        if (response) {
            console.log(response);
            return { statusCode: 200, json: response.json };
        }
        return { statusCode: 500, json: {} };
    }
    isDatePassed(dateString) {
        const [day, month, year] = dateString.split('/').map(Number);
        return new Date(year, month - 1, day) < new Date();
    }
}

module.exports = new CanceledAppointmentServies(canceledAppointmentRepository);


