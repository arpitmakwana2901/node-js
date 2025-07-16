const express = require("express");
const userRoute = require("./routes/userRoute");
const connection = require("./config/db");
const path = require("path");
const app = express();
const port = 3690;

app.set("view engine","ejs");
app.use(express.urlencoded({extended:true}));
app.use("/uploads",express.static(path.join(__dirname,"/uploads")));
app.use("/user",userRoute);

app.listen(port,(error)=>{
    if(error){
        console.log("Server is not running",error);
        return
    }  
    connection();
    console.log("Server is running",port)
})      
