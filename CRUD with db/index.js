const express = require("express");
const connection = require("./config/db");
const UserModal = require("./models/UserModel");
const app = express();
const PORT = 3690;
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  try {
    let showData = await UserModal.find({});
    console.log(showData);
    res.render("home", { showData });
  } catch (error) {
    console.log(error);
  }
});

app.get("/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);
    const deleteData = await UserModal.findByIdAndDelete(id);
    console.log(deleteData);
    res.redirect("/");
  } catch (error) {
    console.log(error);
  }
});
app.post("/add", async (req, res) => {
  try {
    await UserModal.create(req.body);
    console.log("user Data added successfully");
    res.redirect("/");
  } catch (error) {
    console.log(error);
  }
});

app.get("/edit/:id", async (req, res) => {
  const id = req.params.id;
  console.log(id);
  const editData = await UserModal.findById(id);
  console.log(editData);
  res.render("edit", { editData });
});

app.post("/update", async (req, res) => {
  try {
    console.log(req.body);
    await UserModal.findByIdAndUpdate(req.body.id, req.body);
    res.redirect("/");
  } catch (err) {
    console.log(err);
  }
});
app.listen(PORT, (error) => {
  if (error) {
    console.log("server is not connecting", error);
  } else {
    console.log("server is connected", PORT);
    connection();
  }
});
