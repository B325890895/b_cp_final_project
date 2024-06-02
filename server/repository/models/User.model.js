const mongoose = require("mongoose");

const userScema = mongoose.Schema({
    user_id: {
        type: 'number',
        required: true,
    },
    name: {
        type: 'String',
        required: true
    },
    fatherName: {
        type: 'string',
        required: true
    },
    matherName: {
        type: 'string',
        required: true
    },
    HMO: {
        type: 'string',
        required: true
    },
    email: {
        type: 'string',
        required: true
    },
    birthdate: {
        type: 'date',
        required: true
    },
    phoneNumber: {
        type: 'string',
        required: true
    },
    //טיפולים
    // appointment:{type:mongoose.SchemaType.objectId,ref:'Appointment'}

});
module.exports = mongoose.model('User', userScema);