const express = require("express");
const ProductModel = require("../models/productModel");

const dashboardRouter = express.Router();

dashboardRouter.get("/dashboard", (req, res) => {
  res.render("dashboard");
});

dashboardRouter.get("/addProducts", async (req, res) => {
  try {
    res.render("addProducts");
  } catch (error) {
    console.log(error);
  }
  // res.render("/addProducts")
});

dashboardRouter.post("/productAdd", async (req, res) => {
  console.log(req.body);

  try {
    await ProductModel.create(req.body);
    console.log("Product Added Successfully");
    res.redirect("/alldata/dashboard");
  } catch (error) {
    console.log(error);
  }
});

dashboardRouter.get("/viewProducts",async(req,res)=>{
  
  try {
    const allProducts = await ProductModel.find({});
    console.log(allProducts);
    res.render("viewProducts",{allProducts})
    
  } catch (error) {
    console.log(error)
  }
})

module.exports = dashboardRouter;
