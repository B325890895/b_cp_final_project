require("dotenv").config();
const express = require("express");
const server = express();

const port = process.env.PORT;
//const port =3000;

//const loginRouter= require("loginRouter");
const userRouter = require("./API/router/User.router");
const appointmentRouter = require("./API/router/Appointment.router");
const alertRouter = require("./API/router/Alert.router");
const passwordRouter = require("./API/router/Password.router");

server.use(express.json());

//server.use("/login", loginRouter);
server.use(express.json());

server.use("/user", userRouter);
server.use("/appointment", appointmentRouter);
server.use("/alert", alertRouter);
server.use("/password", passwordRouter);


server.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(500).send("Error: ");
});

server.listen(port, async () => {
  console.log(`our app listening on port ${port}!`);
});
