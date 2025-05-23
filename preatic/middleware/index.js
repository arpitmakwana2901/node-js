const express = require("express")
const app = express();
const PORT = 3690;

app.listen(PORT,(error)=>{
    if(error){
        console.log(error)
    }else{
        console.log("Server is connected",PORT)
    }
})

