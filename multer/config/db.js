const mongoose = require("mongoose");

const connction = async ()=>{
  await  mongoose.connect("mongodb://127.0.0.1/multer")
  console.log("DB is connected")
}

module.exports = connction;