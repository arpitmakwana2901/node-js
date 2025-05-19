const express = require("express");
const app = express();
const port = 3690;
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
let record = [];

app.get("/", (req, res) => {
  res.render("home", { record });
});

app.post("/addrecord", (req, res) => {
  console.log(req.body);
  const { userName, age } = req.body;
  if (userName === "" || age === "") {
    console.log("Please fill all fields");
    return res.redirect("/");
  }
  record.push(req.body);
  console.log("Your data added");
  res.redirect("/");
});

app.get("/delete/:id", (req, res) => {
  const userId = req.params.id;
  console.log(userId)
  record= record.filter((item,i) => i != userId);
  res.redirect("/")

});

app.listen(port, (errro) => {
  if (errro) {
    console.log("Server Error");
    return;
  }
  console.log("Server Connected", port);
});
    