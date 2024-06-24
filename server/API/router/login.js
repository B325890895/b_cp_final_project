const express = require("express");
require("dotenv").config();
const router = express.Router();
const confirmPassword = require("../BL/confirmPassword");

router.post("/",(req, res, next) => {
    let userConnection =req.body
    if(!confirmPassword(userConnection)){
    };
});


router.put("/", (req, res)=>{
    res.status(200).json({
        message: "this is the update page"
    });
});

module.exports = router;