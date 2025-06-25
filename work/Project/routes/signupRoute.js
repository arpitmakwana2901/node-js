const express = require("express");
const UserModel = require("../models/userModel");
const { signupValidation } = require("../validation/authValidation");
const signupRoute = express.Router();

signupRoute.get("/",async (req, res) => {
  const userData = await UserModel.find();
  res.render("home", { userData });
});

signupRoute.post("/add", signupValidation, async (req, res) => {
  // console.log(req.body)
  await UserModel.create(req.body);
  console.log("User Added Successfully");
  res.redirect("/user");
});



module.exports = signupRoute; 