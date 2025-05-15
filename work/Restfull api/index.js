const express = require("express");
const app = express();
const PORT = 8080;
const users = require("./db.json");

app.get("/api/users", (req, res) => {
  return res.json(users);
});

app.get("/api/users/:id", (req, res) => {
  const id = Number(req.params.id);
  const user = users.find((user) => user.id === id);
  return res.json(user);
});

app.post("/api/users", (req, res) => {
  // Create New User
  return res.json({ status: "Pending.." });
});

app.patch("/api/users/:id", (req, res) => {
  // Edit user with id
  return res.json({ status: "Pending.." });
});

app.delete('/api/users',(req,res)=>{
    // Create New User
  return res.json({status:"Pending.."})
})

app.listen(PORT, () => console.log("Server Started "));
