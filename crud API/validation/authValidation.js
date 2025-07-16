const joi = require("joi");

const signupValidation = async (req,res,next) =>{
    const signupUser = await joi.object({
        email:joi.string().email().required(),
        password:joi.string().min(4).max(100).required()
    })

    const error = signupUser.validate(req.body);

    if(error){
        return res.status(400).json({
            message:"Bad Request",error
        })
    }
    next()
}

module.exports = {
    signupValidation
} 


