 const express = require("express");
const auth = require("../middlewere/auth");
 const productRouter = express.Router();
 
 productRouter.get("/", auth,(req,res)=>{
    res.send("Show Products")
 })

 module.exports = productRouter;

