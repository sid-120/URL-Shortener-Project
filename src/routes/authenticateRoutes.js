const {
  signup,
  signin,
  loginUser,
} = require("../controllers/authenticateControllers.js");
const express = require("express");

const authRouter = express.Router();

authRouter.get("/", (req, res) => {
  res.send("Auth service is up.");
});
authRouter.get("/auth/logins", loginUser);
authRouter.post("/signup", signup);
authRouter.post("/signin", signin);

module.exports = authRouter;
