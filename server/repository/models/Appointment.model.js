const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    user_id: {
        type: 'number',
        required: true,
    },
    date:{
        type: 'date',
        required: true
    },
    time:{
        type: 'string',
        required: true
    },
    status:{
        type:'number',
        min:0,
        max:3
    }
});
module.exports = mongoose.model('User', userSchema);