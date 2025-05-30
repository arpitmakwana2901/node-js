const express = require("express");
const connection = require("./config/db");
const userRouter = require("./router/userRoute");
const app= express();
const PORT = 3690;
app.set("view engine","ejs");
app.use(express.urlencoded({extended:true}));

app.use("/",userRouter)
app.listen(PORT,(error)=>{
if(error){
    console.log("Server is not connecting");
    return;
}else{
    connection();
    console.log("Server is connected",PORT)
}
})


    