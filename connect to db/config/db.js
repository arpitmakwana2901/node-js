const mongoose = require("mongoose");

const connection =async ()=>{
   await mongoose.connect("mongodb://localhost:27017/user");
    console.log("DATABASE CONNECTED")
}

module.exports = connection;