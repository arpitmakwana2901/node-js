const express = require("express");
const app = express();
const PORT = 3690;
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

let data = [];

app.get("/", (req, res) => {
  res.render("home", { data });
});

app.post("/add", (req, res) => { 
  const { userName, age, email, phone, gender, city } = req.body;

  if (!userName || !age || !email) { 
    console.log("Please fill all required fields");
    return res.redirect("/");
  }

  
  data.push(req.body);
  console.log("Data added successfully:", req.body);
  res.redirect("/");
});

app.get("/delete/:id", (req, res) => {
  console.log(req.params);
  data = data.filter((item, i) => i != req.params.id);
  console.log("Data Deteled Successfully");
  return res.redirect("/");
});

app.get("/edit/:id", (req, res) => {
  const { id } = req.params;
  const getData = data[req.params.id];
  res.render("edit", { getData, id });
});

app.post("/updateData", (req, res) => {
  // const{id,userName,age,email,phone,gender,city} = req.body;
  // data[id] = {userName,age,email,phone,gender,city};
  // console.log("Update Successsfully");
  // res.redirect("/");


  const id = req.body.id;
  const updatedData = {
    userName: req.body.userName,
    age: req.body.age,
    email: req.body.email,
    phone: req.body.phone,
    gender: req.body.gender,
    city: req.body.city,
  };

  // Update your data array
  data[id] = updatedData;

  res.redirect("/"); // Or wherever you want to redirect
});
app.listen(PORT, (error) => {
  if (error) {
    console.log("server is not connecting");
  } else {
    console.log("server is connected", PORT);
  }
});
