const express = require("express")
const app = express();
const PORT = 3690;

// app.get("/",(req,res)=>{
// res.write("Hello From Index Page")
// res.end();
// })

app.set("view engine","ejs")
app.get("/",(req,res)=>{
    res.render("home")
})

app.get("/about",(req,res)=>{
    res.render("about")
})

app.get("/contact",(req,res)=>{
    res.render("contact")
})

app.get("/features",(req,res)=>{
    res.render("features")
})

app.listen(PORT,(error)=>{
if(error){
    console.log("Server is not Connected")
}

console.log("Server is connected",PORT)
})