const mongoose = require("mongoose");

const connection = async () =>{
    await mongoose.connect("mongodb://127.0.0.1/crud-pre");
    console.log("DB CONNECTED");
}

module.exports = connection;
