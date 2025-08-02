const express = require("express");
const connection = require("./config/db");
const userRoute = require("./routes/userRoute");
const recipeRoute = require("./routes/recipeRoute");
const app = express();
const cors = require("cors");
require("dotenv").config();
app.use(express.json());
app.use(cors());
app.use("/user", userRoute);
app.use("/recipe",recipeRoute);

app.listen(process.env.PORT, (error) => {
  if (error) {
    console.log("Server is not connecting", error.message);
    return;
  }
  connection();
  console.log("Server is connecting", process.env.PORT);
});
