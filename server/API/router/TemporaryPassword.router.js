const express = require("express");
require("dotenv").config();
const router = express.Router();
const PasswordController = require("../controllers/TemporaryPassword.controller");

router
  .post("/", async (req, res, next) => {
    PasswordController.create(req, res, next);
  })
  // //more connect to put a delete by id/user nme the a global one and user name in the body
  .delete("/", async (req, res, next) => {
    PasswordController.delete(req, res, next);
  });
router.post("/:userName", async (req, res, next) => {
  console.log("temporary password router");
  PasswordController.read(req, res, next);
});

module.exports = router;
