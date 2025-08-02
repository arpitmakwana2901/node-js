const express = require("express");
const UserModal = require("../models/userModel");
const userRouter = express.Router();
const cookieParser = require("cookie-parser");
const nodemailer = require("nodemailer");
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
  console.log(email);
  let userData = await UserModal.findOne({ email: req.body.email });
  console.log(userData);

  if (!userData) {
    console.log("User Not Found");
    return res.redirect("/userdata");
  }

  let otp = Math.floor(Math.random() * 10000);
  res.cookie("storeOtp", { otp, email: userData.email });
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
  res.redirect("/userdata/otpPage");
});

userRouter.post("/otpPage", (req, res) => {
  console.log("Form body:", req.body);
  let { postOtp } = req.body;
  console.log("Submitted OTP:", postOtp);

  let localOtp = req.cookies.storeOtp;
  console.log("Stored OTP:", localOtp);

  if (!localOtp) {
    console.log("No OTP cookie found");
    return res.redirect("/userdata/otpPage");
  }

  if (postOtp == localOtp.otp) {
    return res.redirect("/userdata/changePass");
  } else {
    console.log("Invalid OTP");
    return res.redirect("/userdata/otpPage");
  }
});

userRouter.get("/changePass", (req, res) => {
  res.render("changePassword");
});

userRouter.post("/changePass", (req, res) => {
  res.render("changePassword");
});

userRouter.post("/updatePassword", async (req, res) => {
  const { newPassword, confirmPassword } = req.body;
  const { email } = req.cookies.storeOtp;

  console.log(req.body, "body new password");
  console.log(email, "update email");

  try {
    if (newPassword === confirmPassword) {
      const updatedPassword = await UserModal.findOneAndUpdate(
        { email: email },
        { password: newPassword }
      );
      // console.log(updatedPassword, "updated password");
      const updatedData = await UserModal.findOne({ email });
      console.log("updated Data", updatedData);

      if (!updatedPassword) {
        console.log("User not found");
        return res.redirect("/userdata/changePass");
      }
      res.cookie("updated", {
        email: updatedPassword.email,
        // password: updatedPassword.newPassword,
        password: updatedPassword.newPassword,
      });
      console.log(res.cookie, "updated cookie");
      return res.redirect("/userdata/");
    } else {
      console.log("Passwords do not match");
      return res.redirect("/userdata/changePass");
    }
  } catch (error) {
    console.log(error);
    return res.redirect("/userdata/changePass");
  }
});

module.exports = userRouter;
