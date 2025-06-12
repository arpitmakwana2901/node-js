const mongoose = require("mongoose");

const multerSchema = new mongoose.Schema({
    image:{
        type:String,
        require:true
    }
})

const multerModel = mongoose.model("user",multerSchema);
module.exports = multerModel;