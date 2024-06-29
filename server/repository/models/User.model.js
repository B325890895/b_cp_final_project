const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  user_id: {
    type: "number",
    required: true,
  },
  userName: {
    type: "String",
    required: true,
  },
  // userState: { 
  //   type: "string", 
  //   value: "client" 
  // },
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
  day: {
    type: "string",
    required: true,
  },
  hour: {
    type: "string",
    required: true,
  },
  canceledAppointments: {
    type: "array",
    required: true,
  },
  //טיפולים
  // appointment:{type:mongoose.SchemaType.objectId,ref:'Appointment'}
});
module.exports = mongoose.model("User", userSchema);
