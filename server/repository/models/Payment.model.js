const mongoose = require("mongoose");

const appointmentSchema = mongoose.Schema({
    userName: {
        type: 'string',
        required: true,
    },
    date:{
        type: 'string',
        required: true,
    },
    appointments:{
        type: 'array',
        required: true,
        default: []
    }
});
module.exports = mongoose.model('appointment', appointmentSchema);