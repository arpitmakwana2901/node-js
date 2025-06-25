const express = require("express");
const connection = require("./config/db");
const UserModel = require("./models/userModel");
const signupRoute = require("./routes/signupRoute");
const app = express();
const PORT = 3690;

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.use("/user",signupRoute);

app.get("/delete/:id",  async(req,res)=>{
    const id = req.params.id;
   // console.log(id)
    await UserModel.findByIdAndDelete(id);
    console.log("Delete")
    res.redirect("/user");
})
 
app.listen(PORT, (error) => {
  if (error) {
    console.log("Server is not connected");
    return;
  }
  connection();
  console.log("Server is connected", PORT);
});
 