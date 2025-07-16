const express = require("express");
const UserModel = require("../models/userModel");
const userRoute = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

userRoute.get("/", (req, res) => {});

userRoute.post("/register", async (req, res) => {
  try {
    let { userName, email, password } = req.body;

    const hashPassword = await bcrypt.hash(password, 10);
    req.body.password = hashPassword;

    await UserModel.create(req.body);
    console.log(req.body);

    return res.status(201).json({
      message: "User Added",
      success: true,
    });
  } catch (error) {
    return res.status(400).json({
      message: "BAD REQUEST",
      error,
    });
  }
});

userRoute.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "User not found",
      });
    }
    console.log(user); 

    if (await bcrypt.compare(password, user.password)) {
      let token = jwt.sign({ user }, process.env.SECRET_KEY, {
        expiresIn: "48h",
      });
      console.log(token);

      return res.status(201).json({
        message: "Login Successfull",
        token,
        success: true,
      });
    } else {
      return res.status(201).json({
        message: "Invalid Password",
        success: false,
      });
    }
  } catch (error) {
    return res.status(400).json({
      message: "BAD REQUEST",
      error,
    });
  }
});

module.exports = userRoute;
