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
    hour:{
        type: 'string',
        required: true,
    },
    status:{
        type:'number',
        min:0,
        max:3
    }
});
module.exports = mongoose.model('appointment', appointmentSchema);