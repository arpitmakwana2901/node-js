const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    userName:{
        type:String,
        require:true,
    },
    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true,
    }
})

const UserModel = mongoose.model("auth_user",userSchema);
module.exports = UserModel;
