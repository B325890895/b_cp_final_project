const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  user_id: {
    type: "number",
    required: true,
  },
  name: {
    type: "String",
    required: true,
  },
  birthDate: {
    type: "date",
    required: true,
  },
  HMO: {
    type: "string",
    required: true,
  },
  father: {
    name: {
      type: "string",
      required: true,
    },
    phoneNumber: {
      type: "string",
      required: true,
    },
  },
  mother: {
    name: {
      type: "string",
      required: true,
    },
    phoneNumber: {
      type: "string",
      required: true,
    },
  },
  email: {
    type: "string",
    required: true,
  },
  //טיפולים
  // appointment:{type:mongoose.SchemaType.objectId,ref:'Appointment'}
});
module.exports = mongoose.model("User", userSchema);
