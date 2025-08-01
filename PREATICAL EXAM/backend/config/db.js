const mongoose = require("mongoose");

const connection = async () => {
  await mongoose.connect(process.env.MONGODB_URL);
  console.log("DB CONNECTED");
};

module.exports = connection;
