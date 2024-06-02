require("dotenv").config;
const express = require("express");
const server = express();

//const port = process.env.PORT||3000 ;
const port =3000;

//const loginRouter= require("loginRouter");
const userRouter = require("./API/router/User.router");
    

server.use(express.json());


//server.use("/login", loginRouter);
server.use(express.json());

server.use("/user", userRouter);

server.use((err, req, res, ) => {
    console.log(err.stack)
   res.status(500).send('Error: ' + err.stack);
})

server.listen(port,async () => {
    console.log(`our app listening on port ${port}!`)});





