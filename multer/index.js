const express = require("express");
const connction = require("./config/db");
const upload = require("./middleware/multer");
const multerModel = require("./model/multerModel");
const app = express();
const path=require("path")
const PORT = 3690;
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use("/uploads",express.static(path.join(__dirname,"/uploads")));

app.get("/",async (req, res) => {
   try{
     let showData = await multerModel.find({});
    console.log(showData)
  res.render("home",{showData});
   }catch(error){
    console.log(error);   
   }
}); 

app.post("/add", upload, async (req, res) => {
  try {
    if (req.file) {
      console.log(req.file);
      req.body.image = "./uploads/" + req.file.filename;
    }
    console.log(req.body)
    await multerModel.create(req.body)
    res.redirect("/");
  } catch (error) {
    console.log(error);
    res.redirect("/"); 
  }
});


app.listen(PORT, (error) => {
  if (error) {
    console.log("Server is not running");
  } else {
    connction();
    console.log("Server is runing", PORT);
  }
});
    