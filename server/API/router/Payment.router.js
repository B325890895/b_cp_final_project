const express = require("express");
require("dotenv").config();
const router = express.Router();
const PaymentController = require("../controllers/Payment.controller");

router
  .route("/")
  .get((req, res, next) => {
    console.log("GET all users");
    PaymentController.readAll(req, res, next);
  })
  .post((req, res, next) => {
    PaymentController.create(req, res, next);
  });

router
  .route("/:id")
  .get((req, res, next) => {
    PaymentController.read(req, res, next);
  })
  .put((req, res, next) => {
    PaymentController.update(req, res, next);
  })
  .delete((req, res, next) => {
    PaymentController.delete(req, res, next);
  });

module.exports = router;
