    const mongoose = require("mongoose");

    const empSchema = new mongoose.Schema({
        userName:{
            type:String,
            require:true
        },
        email:{
            type:String,
            require:true
        },
        password:{
            type:Number,
            require:true
        }
    })

    const EmpModel = mongoose.model("empData",empSchema)

    module.exports = EmpModel;