
const mongoose = require("mongoose");

const userSchema  = new mongoose.Schema({
    userName:{
        type:String,
        require:true
    },
    age:{
        type:Number,
        require:true
    },
    image:{
        type:String,
        require:true
    }
})
 
const UserModel = mongoose.model("user",userSchema);
module.exports = UserModel;
