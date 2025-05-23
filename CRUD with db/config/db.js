const mongoose = require("mongoose");

const connection = ()=>{
    mongoose.connect("mongodb://localhost:27017/employee")
    console.log("DB IS CONNECTED");
    
}

module.exports = connection;
    