const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  // Getting token from the header after signing in
  const token = req.header("Authorization");
  // If token is not present
  if (!token) {
    return res.status(400).json({ message: " Unauthorized" });
  }

  // jwt verification of the token
  jwt.verify(token, "secret", (err, user) => {
    // when token mismatch to the key
    if (err) {
      return res.status(400).json({ message: "Forbidden" });
    }
    // if everything is right, set the user and proceed to next()
    req.user = user;
    next();
  });
};

module.exports = authenticateToken;
