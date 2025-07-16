const express = require("express");
const connection = require("./config/db");
const userRoute = require("./routes/userRoute");
const todoRoute = require("./routes/todoRoute");
const app = express();
require("dotenv").config();

app.use(express.json());
app.use("/user", userRoute);
app.use("/todolist", todoRoute);

app.listen(process.env.PORT, (error) => {
  if (error) {
    console.log("Server is not connected");
    return;
  }
  connection();
  console.log("Server is connected", process.env.PORT);
});
