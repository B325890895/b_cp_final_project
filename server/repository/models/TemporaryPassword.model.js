const mongoose = require("mongoose");

const temporaryPasswordSchema = mongoose.Schema({
userName:{
    type:"string",
    required:true
},
password:{
    type:"string",
    required:true
}
 
});
module.exports = mongoose.model("TemporaryPasswordSchema", temporaryPasswordSchema);
