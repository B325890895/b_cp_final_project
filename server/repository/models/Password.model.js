const mongoose = require("mongoose");

const passwordSchema = mongoose.Schema({
userName:{
    type:"string",
    required:true
},
password:{
    type:"string",
    required:true
}
 
});
module.exports = mongoose.model("Password", passwordSchema);
