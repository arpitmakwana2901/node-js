const express = require("express");
const UserModal = require("../models/userModel");
const userRouter = express.Router();
const cookieParser = require("cookie-parser");
const nodemailer = require("nodemailer")
userRouter.get("/", (req, res) => {
  return res.render("signIn");
});

userRouter.get("/signup", (req, res) => {
  res.render("signUp");
});

userRouter.post("/signup-user", async (req, res) => {
  try {
    const result = await UserModal.find({ email: req.body.email });
    console.log("result", result);
    if (result.length !== 0) {
      console.log("Email ALredy Exists");
      return res.status(400).json({ message: "Email Already Exists" });
    }

    await UserModal.create(req.body);

    console.log("Registration Successfull");
    res.redirect("/userdata/");
  } catch (error) {
    console.log(error);
  }
});

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  console.log("req.body", email, password);

  try {
    let userData = await UserModal.findOne({ email });
    console.log("userdata", userData);

    if (userData.password == password) {
      req.flash("success", "login successfully");
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

userRouter.get("/logout", (req, res) => {
  req.flash("success", "logout successfully");
  req.session.destroy();

  res.redirect("/userdata");
});


userRouter.get("/otpPage", (req, res) => {
  res.render("otp"); 
});



userRouter.post("/otpCheck", async (req, res) => {
  const { email } = req.body;
  console.log(email)
  let userData = await UserModal.findOne({email: req.body.email });
  console.log(userData);

  if (!userData) {
    console.log("User Not Found");
    return res.redirect("/userdata");
  }

  let otp = Math.floor(Math.random() * 10000);
  console.log("Generated OTP", otp);

  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "arpitmakwana7376@gmail.com",
      // pass: "moqe ejow zcif hpzt", 
    },
  });

  let mailOptions = {
    from: "arpitmakwana7376@gmail.com",
    to: email,
    subject: "Update OTP",
    text: `My OTP is ${otp}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Email send error:", error);
    } else {
      console.log("Email sent:", info.response);
    }
  });
  res.redirect("/userdata/otpPage") 
});

userRouter.post("/otpPage", (req, res) => {
  res.redirect("/userdata/changePass"); 
});

userRouter.get("/changePass",(req,res)=>{
  res.render("changePassword")
});



module.exports = userRouter;
