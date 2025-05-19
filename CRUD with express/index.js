const express = require("express")
const app =express();
const PORT = 3690;
app.set("view engine","ejs")
app.use(express.urlencoded({extended:true}));

const arrData = [];
app.get("/",(req,res)=>{
    res.render("Home",{arrData})
})

app.post("/addData",(req,res)=>{
    console.log(req.body);
    const { userName, age } = req.body; // destructuring
    if(userName === "" || age === ""){
        console.log("Fill Field")
      return  res.redirect("/")
    }
    arrData.push(req.body);
    res.redirect("/")
})

app.listen(PORT,(error)=>   {
    if(error){
        console.log("Server is not connected")
    }
    console.log("Server is connected",PORT)
})

