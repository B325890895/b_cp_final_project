const express = require("express");
require("dotenv").config();
const router = express.Router();
const AppointmentController = require("../controllers/Appointment.controller");

router.
    route("/")
    .get(AppointmentController.readAll)
    .post((req, res, next) => {
        AppointmentController.create(req, res, next)
    });


router.
    route("/:userName")
    .get((req, res, next) => {
        AppointmentController.read(req, res, next)
    })
    .put((req, res, next) => {
        AppointmentController.update(req, res, next)
    })
    .delete((req, res, next) => {
        AppointmentController.delete(req, res, next)
    });

router.
    route("/:userName/:filter")
    .get((req, res, next) => {
        AppointmentController.read(req, res, next); // נניח שיש לך פונקציה בשם readNext ב-AppointmentController
    });

module.exports = router;




