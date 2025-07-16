const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    console.log(token);
    console.log(req.body);
    if (!token) {
      return res.status(401).json({
        message: "Invalid Password",
      });
    }

    let decoded = jwt.verify(token.split(" ")[1], "arpit123");
    console.log(decoded);

    if (!decoded) {
      return res.status(403).json({ message: "Invalid token" });
    }

    if (decoded.userData.email !== req.body.email) {
      return res.status(400).json({ message: "Invalid email" });
    }

    

    next();
  } catch (error) {
    return res.status(400).json({
      message: "Bad Request",
      success: false,
      error: error.message,
    });
  }
};

module.exports = auth;
