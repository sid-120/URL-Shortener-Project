const { signup, signin } = require("../controllers/authenticateControllers.js");
const express = require("express");

const authRouter = express.Router();

authRouter.post("/signup", signup);
authRouter.post("/signin", signin);

module.exports = authRouter;
