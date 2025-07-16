const express = require("express");
const ensureAuthenticated = require("../middlewere/auth");
const productRouter = express.Router();


productRouter.get("/",ensureAuthenticated,(req,res)=>{
    res.status(200).json([
        {
            name:"mobile",
            price:10000,
        },
        {
            name:"tv",
            price:20000
        }
    ])
})

module.exports = productRouter;