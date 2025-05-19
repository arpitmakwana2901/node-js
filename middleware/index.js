const express = require("express");
const auth = require("./middleware/authentication");
const app = express();
const PORT = 8080;
// const auth = require("./middleware/authentication");

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  res.render("home");
});

// app.use(auth);

app.get("/about",auth, (req, res) => {
  res.render("about");

});

app.get("/features", (req, res) => {
  res.render("features");

});

app.listen(PORT, (err) => {
  if (err) {
    console.log("Server is not Connecting");
  } else {
    console.log("Server is connecting", PORT);
  }
});
