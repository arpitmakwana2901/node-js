const joi = require("joi");

const signupValidation = async (req, res, next) => {
  const signupUser = joi.object({
    name: joi.string().min(3).max(100).required(),
    email: joi.string().email().required(),
    password: joi.string().min(4).max(100).required(),
  });

  const { error } = signupUser.validate(req.body);

  if (error) {
    return res.status(400).json({
      message: "Bad Request",
      error: error.details[0].message,
    });
  }

  next();
};


const loginValidation = async (req, res, next) => {
  const loginUser = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(4).max(100).required(),
  });

  const { error } = loginUser.validate(req.body);

  if (error) {
    return res.status(400).json({
      message: "Bad Request",
      error: error.details[0].message,
    });
  }

  next();
};


module.exports = {
    signupValidation,
    loginValidation
}