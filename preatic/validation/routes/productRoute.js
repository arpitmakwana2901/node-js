const express = require("express");
const productRoute = express.Router();

productRoute.get("/",(req,res)=>{
    res.render("product")
})

productRoute.post("/product/productPage",(req,res)=>{
    res.render("product")
})


module.exports = productRoute;