const express = require("express");
require("dotenv").config();
const router = express.Router();
const PasswordController = require("../controllers/Password.controller");

router.post("/", async (req, res, next) => {
  PasswordController.create(req, res, next);
});
// .delete("/", async (req, res, next) => {
//     PasswordController.delete(req, res, next)
// });
router.post("/:userName", async (req, res, next) => {
  console.log("password router");
  PasswordController.read(req, res, next);
});

module.exports = router;
