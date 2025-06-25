const express = require("express");
const UserModel = require("../models/userModels");
const bcrypt = require("bcrypt");
const cookies = require("cookie");
const userRouter = express.Router();

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

userRouter.get("/signIn", (req, res) => {
  res.render("signIn");
});

userRouter.post("/signup", async (req, res) => {
  req.body.password = await bcrypt.hash(req.body.password, 10);
  console.log(req.body);

  try {
    const user = await UserModel.findOne({ email: req.body.email });
    // console.log(user);
    if (user) {
      console.log("User already exists");
      return res.status(400).json({message:"User already exists", success:false})
      // return res.redirect("/userdata/signUp");
    }

    await UserModel.create(req.body);
    console.log("SignUp Successfully");
    res.redirect("/userdata/signIn");
  } catch (error) {
    console.log(error);
  }
});

userRouter.post("/signIn", async (req, res) => {
  const { email, password } = req.body;
  console.log("req.body", email, password);

  try {
    let userData = await UserModel.findOne({ email });
    console.log("userdata", userData);

    if (!userData) {
      console.log("User Not Found", userData);
      return res.status(400).json({message:"User Not Found",success:false})
      // return res.redirect("/userdata/signIn");
    }
       const matchPassword = await bcrypt.compare(password, userData.password);
      
       console.log(matchPassword);

    if (!matchPassword) {
      console.log("Invalid password");
      return res.status(400).json({message:"Invalid password",succcess:false})
      // return res.redirect("/userdata/signIn");
    } else {
      console.log("signIn Successfull");
      res.cookie("auth", userData);
      return res.redirect("/alldata/dashboard");
    }

    // if (userData.password == matchPassword) {
    //   console.log("signIn Successfull");
    //   return res.redirect("/alldata/dashboard");
    // } else {
    //   console.log("invalid password");
    //   return res.redirect("/userdata/signIn");
    // }
    
  } catch (error) {
    console.log(error);
    res.redirect("/userdata/");
  }
});
 
module.exports = userRouter;
