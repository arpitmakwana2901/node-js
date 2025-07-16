const express = require("express");
const { signupValidation, loginValidation } = require("../middlewere/authValidation");
const { signupController, loginController } = require("../controller/authController");
const authRouer = express.Router();

authRouer.post("/login",loginValidation,loginController)

authRouer.post("/signup",signupValidation,signupController)

module.exports = authRouer;   