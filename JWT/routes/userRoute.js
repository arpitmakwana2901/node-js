const express = require("express");
const UserModel = require("../model/userModel");
const userRoute = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

userRoute.post("/registration", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Please fill all required fields",
        success: false,
      });
    }

    const findUser = await UserModel.findOne({ email });
    if (findUser) {
      return res.status(409).json({
        message: "Email already registered",
        success: false,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);
    req.body.password=hashedPassword;

    await UserModel.create(req.body);
    console.log(req.body);

    return res.status(201).json({
      message: "User registered successfully",
      user: req.body,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
});

userRoute.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
        success: false,
      });
    }

    const userData = await UserModel.findOne({ email });
    console.log(userData, "userdata");

    if (!userData) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    const matchedPassword = await bcrypt.compare(password, userData.password);
    console.log(matchedPassword);

    if (!matchedPassword) {
      return res.status(401).json({
        message: "Invalid password",
        success: false,
      });
    }

    const token = jwt.sign( 
      {userData},
      "arpit123", 
      { expiresIn: "24h" }
    );

    console.log(token, "token");

    return res.status(200).json({
      message: "Login successful",
      token,
      success: true,
    });
 
  } catch (error) {
    return res.status(500).json({ 
      message: "Server error",
      error: error.message,
    });
  }
});

 
userRoute.get("/", async (req, res) => {
  try {
    const users = await UserModel.find({});
    return res.status(200).json({
      message: "Users fetched successfully",
      data: users,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch users",
      error: error.message,
    });
  }
});

module.exports = userRoute;
