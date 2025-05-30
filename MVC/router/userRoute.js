const express = require("express");
const UserModel = require("../models/userModel");

const userRouter = express.Router();

userRouter.get("/",async(req,res)=>{
    let userData = await UserModel.find({})
    res.render("home",{userData})
})  


userRouter.post("/add",async(req,res)=>{
    await UserModel.create(req.body);
    console.log("User Data Added Successfully");
    res.redirect("/");
})

module.exports = userRouter;