const express = require("express");
const connection = require("./config/db");
const app = express();
const userRouter = require("./routes/userRouter");
const dashboardRouter = require("./routes/dashboardRouter");
const verifier = require("email-verifier");

// ✅ Add your real API key here
const EmailVerifier = new verifier("my-app", {
  apiKey: "YOUR_REAL_API_KEY", // 🔑 Replace with your API key
});
const PORT = 3690;
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/assets", express.static("assets"));

app.use("/userdata", userRouter);
app.use("/dashboard", dashboardRouter);

app.post("/verify", (req, res) => {
  const { email } = req.body;
  EmailVerifier.verify(email, (err, info) => {
    if (err) {
      console.log("Verification Error:", err);
      return res.status(500).json({ message: "Verification failed", error: err });
    }
    console.log("Verification Info:", info);
    return res.status(200).json({ message: "Verification complete", data: info });
  });
});

app.listen(PORT, (error) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Server is running ", PORT);
    connection();
  }
});
