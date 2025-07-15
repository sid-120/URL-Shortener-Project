const express = require("express");
const bodyParser = require("body-parser");
const connectDB = require("../config/db.js");
const authRouter = require("./routes/authenticateRoutes.js");

const app = express();
app.use(bodyParser.json());

connectDB();

// Middleware function which is placed before all routes.
function myMiddleware(req, res, next) {
  console.log("Middleware executed!");
  next();
}

app.use(myMiddleware);

app.use("/auth", authRouter);

app.get("/", function (req, res) {
  res.send("Server is running");
});

app.listen(5000, function () {
  console.log("Server is running on http://localhost:5000");
});
