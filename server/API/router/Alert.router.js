const express = require("express");
require("dotenv").config();
const router = express.Router();
const AlertController = require("../controllers/Alert.controller");

router.
    route("/")
    .get(AlertController.readAll)
    .post((req, res, next) => {
        AlertController.create(req, res, next)
    });
    

router.
    route("/:id")
    .get((req,res,next)=>{
        AlertController.read(req, res, next)})
    .put((req,res,next)=>{
        AlertController.update(req, res, next)})
    .delete((req, res, next) => {
        AlertController.delete(req, res, next)});
router.
    route("/appintment/:filter")
    .get((req, res, next) => {
        AlertController.read(req, res, next); 
    })
module.exports = router;




