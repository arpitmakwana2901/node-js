const express = require("express");
const UserModal = require("../models/userModel");
const userRouter = express.Router();
const cookieParser = require("cookie-parser");

userRouter.get("/", (req, res) => {
  const allData = req.cookies.auth;
  console.log(allData);
  if (!allData) {
    return res.render("signIn");
  }

  return res.redirect("/alldata/dashboard");
});
 
userRouter.get("/signup", (req, res) => {
  res.render("signUp");
});

userRouter.post("/signup-user", async (req, res) => {
  try {
    await UserModal.create(req.body);
    console.log("added success");
    res.redirect("/userdata/");
  } catch (error) {
    console.log(error);
  }
});
 
userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  console.log("req.body",email,password);

  try {
    let userData = await UserModal.findOne({email})
    console.log("userdata",userData);
    if (userData.password == password) {
      res.cookie("auth", userData);
      res.redirect("/alldata/dashboard"); 
    } else {
      console.log("invalid password");
      res.redirect("/userdata/");
    }
  } catch (error) {
    console.log(error);
    res.redirect("/userdata/");
  }
});
 
module.exports = userRouter;
