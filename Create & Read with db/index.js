const express = require("express");
const connection = require("./config/db");
const EmpModel = require("./model/EmpModel");
const app = express();
const PORT = 3690;
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.get("/", async (req, res) => {
  try {
    let empData = await EmpModel.find({});
    res.render("home", { empData });
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});

app.get("/delete/:id",async (req, res) => {
    let id = req.params.id;
    console.log(id)
  const deleteData = await EmpModel.findOneAndDelete({});
    console.log(deleteData);

  res.redirect("/")
});

app.post("/addData", async (req, res) => {
  try {
    await EmpModel.create(req.body);
    res.redirect("/");
    console.log("User Data Added Successfully");
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});

app.listen(PORT, (error) => {
  if (error) {
    console.log("Server is not connected");
    return;
  } else {
    console.log(`Server is running at http://localhost:${PORT}`);
    connection();
  }
});
