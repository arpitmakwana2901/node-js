const express = require("express");
const connection = require("./config/db");
const dashboardRouter = require("./routes/dashboardRoutes");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const app = express();
const path = require("path");
const userRouter = require("./routes/userRouter");

const flash = require("connect-flash");
const connectFlash = require("./middlewere/flash");

const PORT = 3690; 
app.set("view engine", "ejs");
  
app.use(session({
  secret: 'arpit',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 6000} 
})) 
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/assets", express.static(path.join(__dirname, "/assets")));
app.use(cookieParser());    

app.use(flash()); 
 
app.use(connectFlash.setFlash);     
  
app.use("/alldata", dashboardRouter);
app.use("/userdata", userRouter); 
app.listen(PORT, (error) => {  
  if (error) {           
    console.log(error);   
  } else { 
    console.log("Server is running ",PORT);
    connection();
  }    
});    