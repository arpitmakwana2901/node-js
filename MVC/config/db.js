    const mongoose = require("mongoose");

    const connection = async ()=>{
       await mongoose.connect("mongodb://localhost:27017/arpit")
        console.log("Database Connected Successfully")
    }

    module.exports = connection;