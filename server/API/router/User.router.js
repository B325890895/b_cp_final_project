const express = require("express");
require("dotenv").config();
const router = express.Router();
const UsersController = require("../controllers/Users.controller");

router
  .route("/")
  .get((req, res, next) => {
    UsersController.readAll(req, res, next);
  })
  .post((req, res, next) => {
    UsersController.create(req, res, next);
  });

router
  .route("/:id")
  .get((req, res, next) => {
    UsersController.read(req, res, next);
  })
  .put((req, res, next) => {
    UsersController.update(req, res, next);
  })
  .delete((req, res, next) => {
    UsersController.delete(req, res, next);
  });

module.exports = router;
