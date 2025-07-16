const express = require("express");
const UserModel = require("../models/userModel");
const { signupValidation } = require("../validation/authValidation");
const userRouter = express.Router();

userRouter.get("/", async (req, res) => {
  try {
    let getData = await UserModel.find({});
    console.log(getData);
    return res.status(200).json({
      message: "success",
      data: getData,
    });
  } catch (error) {
    return res.status(401).json({
      error: error,
      success: false,
    });
  }
});

userRouter.post("/",signupValidation, async (req, res) => {
const {email,password} = req.body;

  if (!email && !password) {
    return res.status(404).json({
      message: "Please Fill Required Field",
      success: false,
    });
  }

  try {
    await UserModel.create(req.body);
    res.status(200).json({
      message: "User Added Successfully",
      success: true,
    });
  } catch (error) {
    return res.status(401).json({
      message: error,
      success: false,
    });
  }
});

userRouter.delete("/:id",async(req,res)=>{
    const id = req.params.id;
    try {
        await UserModel.findByIdAndDelete(id);
        return res.status(200).json({
            message:"User Deleted Successfully",
            success:true
        })
    } catch (error) {
        return res.status(401).json({
            message:error,
            success:false
        })
    }
})

module.exports = userRouter;

