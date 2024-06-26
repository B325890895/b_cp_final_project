require("dotenv").config();
const express = require("express");
const server = express();

const port = process.env.PORT;
//const port =3000;
//const loginRouter= require("./API/router/Password.router");
const userRouter = require("./API/router/User.router");
const appointmentRouter = require("./API/router/Appointment.router");
const alertRouter = require("./API/router/Alert.router");
const passwordRouter = require("./API/router/Password.router");
const temporaryPasswordRouter = require("./API/router/TemporaryPassword.router");

server.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173"); // Update this with your frontend URL
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});
server.use(express.json());

server.use(express.json());

server.use("/login", passwordRouter);
server.use("/user", userRouter);
server.use("/appointment", appointmentRouter);
server.use("/alert", alertRouter);
server.use("/temporaryPassword", temporaryPasswordRouter);
server.use("/password", passwordRouter);


server.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(500).send("Error: ");
});

server.listen(port, async () => {
  console.log(`our app listening on port ${port}!`);
});
