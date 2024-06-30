const mongoose = require("mongoose");

const CanceledAppointmentSchema = mongoose.Schema({
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
    canceledBy:{
        type: 'string',
        required: true,
        validate: {
            validator: function(v) {
              return v === 'meneger' || v === 'client';
            },
            message: props => `${props.value} is not the specific string!`
          }
    }
});
module.exports = mongoose.model('Canceled Appointment', CanceledAppointmentSchema);