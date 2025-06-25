const express = require("express");
const dashboardRouter = require("./routes/dashboardRouter");
const app = express();
const port = 3690;
const path = require("path");
const userRouter = require("./routes/userRouter");
const connection = require("./config/db");
const cookieParser = require("cookie-parser");
const flash = require("flash");
app.use("/assets", express.static(path.join(__dirname, "/assets")));
app.use(express.urlencoded({ extended: true }));
app.set("view engine","ejs")

app.use(cookieParser());
app.use("/alldata",dashboardRouter); 
app.use("/userdata",userRouter); 
 
app.listen(port,(error)=>{
if(error){
    console.log("Server is not connecting")
} 
connection(); 
console.log("server is connecting",port)
})   

 