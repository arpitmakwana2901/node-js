const express = require("express");
const connection = require("./config/db");
const userRoute = require("./routes/userRoute");
const productRouter = require("./routes/productRoute");
const auth = require("./middlewere/auth");
const app = express();
const PORT = 3690;
app.use(express.json())


app.use("/user",userRoute)
app.use("/product",productRouter);



app.listen(PORT,(error)=>{
    if(error){
        console.log("Server is not connecting");
        return;
    }
    else{
        connection();
        console.log("Server is connected",PORT)
    }
})