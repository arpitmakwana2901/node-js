const express= require("express");
const connection = require("./config/db");
const PORT = 3699;

const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const authRouer = require("./routes/authRouter");
const productRouter = require("./routes/productRouter");
app.use(cors());
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

// require('dotenv').config();

// const PORT = process.env.PORT || 3690;

app.get("/ping",(req,res)=>{
    res.send("PONG") 
})

app.use("/auth",authRouer);
app.use("/products",productRouter);

app.use(bodyParser.json());
app.use(cors());


app.listen(PORT,(error)=>{
    if(error){
        console.log("Server is not connecting");
    }
    connection();
    console.log("Server is connecting",PORT)
})    