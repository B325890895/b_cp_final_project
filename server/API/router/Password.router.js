const express = require("express");
require("dotenv").config();
const router = express.Router();
const PasswordController = require("../controller/Password.controller");

router.post("/",(req, res, next) => {
        UsersController.create(req, res, next)
    });
    

router.
    route("/:id")
    .put((req,res,next)=>{
        UsersController.update(req, res, next)})
    .delete((req, res, next) => {
        UsersController.delete(req, res, next)});

module.exports = router;




