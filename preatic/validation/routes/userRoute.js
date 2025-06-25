const express = require("express");
const UserModel = require("../model/userModel");
const bcrypt = require("bcrypt");

const userRoute = express.Router();

userRoute.get("/registration",(req,res)=>{
    res.render("registration");
}) 

userRoute.get("/login",(req,res)=>{
    res.render("login")
})

userRoute.post("/registred-user",async(req,res)=>{
    req.body.todolist=[];
    req.body.password=await bcrypt.hash(req.body.password,10);
    console.log(req.body); 

    // const arpit="arpit";
    // if(await bcrypt.compare(arpit,req.body.password)){
    //     console.log("successfully login");
    // }else{
    //     console.log("wrong password");
    // }

    await UserModel.create(req.body);
    console.log("Registration Success");
    res.redirect("/user/login")
})

userRoute.post("/login-user",async(req,res)=>{
    const{email,password} = req.body;

    let result = await UserModel.findOne({email});
    console.log(result)

    if(await bcrypt.compare(password,result.password)){
        console.log("Login Successfully"); 
         res.redirect("/product");
         return
    }else{
        console.log("Incorrect Password");
        res.redirect("/user/login")
    }

}) 
module.exports = userRoute;