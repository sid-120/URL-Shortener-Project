const express = require("express");
const bodyParser = require("body-parser");
const connectDB = require("../config/db.js");
const authRouter = require("./routes/authenticateRoutes.js");
const urlRouter = require("./routes/urlRoutes.js");

const app = express();
app.use(bodyParser.json());

connectDB();

// Middleware function which is placed before all routes.
function myMiddleware(req, res, next) {
  console.log("Middleware executed!");
  next();
}

app.use(myMiddleware);

app.use("/url", urlRouter);
app.use("/auth/users", authRouter);

app.get("/", function (req, res) {
  res.send("Server is running");
});

// Public redirection route
app.get("/:shortCode", async (req, res) => {
  try {
    const { shortCode } = req.params;
    const url = await URL.findOne({ shortCode });
    if (!url) return res.status(404).send("Short URL not found");
    res.redirect(url.originalUrl);
  } catch (err) {
    res.status(500).send("Server error");
  }
});

app.listen(5000, function () {
  console.log("Server is running on http://localhost:5000");
});
