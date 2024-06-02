const nomgoose= require('mongoose');
require('dotenv').config;
mongoose.connect(process.env.DATA_BASE_URL);
const db = mongoose.connection;
db.on('error',error=>console.log(error));
