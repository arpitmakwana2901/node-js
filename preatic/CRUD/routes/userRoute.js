const express = require("express");
const UserModel = require("../model/userModel");
const upload = require("../middlewere/multer");
const userRoute = express.Router();

userRoute.get("/", async (req, res) => {
  try {
    const userData = await UserModel.find({});
    res.render("home", { userData });
  } catch (error) {
    console.log(error);
    res.redirect("/user");
  }
});

userRoute.post("/add", upload, async (req, res) => {
  try {
    if (req.file) {
      req.body.image = "/uploads" + "/" + req.file.filename;
    }
    const { userName, age } = req.body;

    await UserModel.create(req.body);
    console.log(req.body);

    res.redirect("/user");
  } catch (error) {
    console.log(error);
    res.redirect("/user");
  }
});

userRoute.get("/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await UserModel.findByIdAndDelete(id);
    console.log("User Delete Successfully");
    res.redirect("/user");
  } catch (error) {
    console.log(error);
    res.redirect("/user");
  }
});
module.exports = userRoute;
