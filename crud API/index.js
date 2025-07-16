const express = require("express");
const connection = require("./config/db");
const userRouter = require("./routes/userRoutes");
const app = express();
const PORT = 3690;
app.use(express.urlencoded({extended:true}))
app.use(express.json());

app.use("/user",userRouter);

app.listen(PORT, (error) => {
  if (error) {
    console.log("Server is not running");
    return;
  }
  connection();
  console.log("Server is runnig", PORT);
});
