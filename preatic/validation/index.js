const express  = require("express");
const connection = require("./config/db");
const userRoute = require("./routes/userRoute");
const productRoute = require("./routes/productRoute");
const app = express();
const PORT = 3690;
app.set("view engine","ejs");
app.use(express.urlencoded({extended:true}))

app.use("/user",userRoute)
app.use("/product",productRoute) 
 

app.listen(PORT,(error)=>{
    if(error){ 
        console.log("Server is not connected");
        return;
    }  
    connection(); 
    console.log("Server is connected",PORT)
})    