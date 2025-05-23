const express = require("express");
const connection = require("./config/db");
const app = express();
const PORT = 3690;

app.get("/", (req, res) => {
  res.send("Hello From Home Page");
});
app.listen(PORT, (error) => {
  if (error) {
    console.log("Server is not connected");
  } else {
    connection();
    console.log("Server is CONNECTED", PORT);
  }
});
