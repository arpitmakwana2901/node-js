const UserModel = require("../models/userModel");
const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");
const secretKey = 'arpit';

const signupController = async (req, res) => {
  try {
    // if (!req.body) {
    //   return res.status(400).json({
    //     message: "Request body is missing",
    //     success: false,
    //   });
    // }

    const { userName, email, password } = req.body;
    const user = await UserModel.findOne({ email });

    if (user) {
      return res.status(409).json({
        message: "User already exists, please login",
        success: false,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const userModel = new UserModel({
      userName,
      email,
      password: hashedPassword,
    });

    await userModel.save();

    res.status(201).json({
      message: "Signup successful",
      success: true,
    });

  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
      success: false,
    });
  }
};

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    const errorMsg = "Auth failed: email or password is wrong";

    if (!user) {
      return res.status(403).json({
        message: errorMsg,
        success: false,
      });
    }

    const isEqualPass = await bcrypt.compare(password, user.password); 
    if(!isEqualPass){
      return res.status(403).json({ 
        message: errorMsg,
        success: false
      });
    }

    const jwtToken = jwt.sign(
      {email: user.email, _id: user.id},
      secretKey,
      {expiresIn: '24h'}
    );

    res.status(200).json({
      message: "Login Successfully",
      success: true,
      token: jwtToken,
      email,
      name: user.name
    });

  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
      success: false,
    });
  }
};

module.exports = {
  signupController,
  loginController
};
