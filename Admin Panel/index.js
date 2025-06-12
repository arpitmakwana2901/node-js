const express = require("express");
const connection = require("./config/db");
const dashboardRouter = require("./routes/dashboardRoutes");
const cookieParser = require("cookie-parser");
const app = express();
const path = require("path");
const userRouter = require("./routes/userRouter");
const PORT = 3690; 
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use("/assets", express.static(path.join(__dirname, "/assets")));
app.use(cookieParser());

app.use("/alldata", dashboardRouter);
app.use("/userdata", userRouter);
app.listen(PORT, (error) => {  
  if (error) {     
    console.log(error);  
  } else { 
    console.log("Server is running ", PORT);
    connection();
  }
}); 
          