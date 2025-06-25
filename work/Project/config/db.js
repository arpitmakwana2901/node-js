const mongoose = require("mongoose");

const connection =async ()=>{
    await mongoose.connect("mongodb://localhost:27017/preatic-todo")
    console.log("DB CONNECTED")
}

module.exports = connection;