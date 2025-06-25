const express = require("express");
const { signupValidation } = require("../middlewere/authValidation");
const { signupController } = require("../controller/authController");
const authRouer = express.Router();

authRouer.post("/login",(req,res)=>{
    res.send("Login Seccess")
})

authRouer.post("/signup",signupValidation,signupController)

module.exports = authRouer; 