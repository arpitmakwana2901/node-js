const mongoose = require("mongoose");

const connection = async() =>{
    await mongoose.connect("mongodb://127.0.0.1:27017/mern-app");
    console.log("DB CONNECTED");
}

module.exports = connection;  