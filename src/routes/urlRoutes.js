const express = require("express");
const authenticateToken = require("../middlewares/middlewareAuth.js");
const {
  getUrl,
  shortenURL,
  updateUrl,
  deleteUrl,
} = require("../controllers/urlControllers.js");

const urlRouter = express.Router();
urlRouter.use(authenticateToken);

urlRouter.get("/", getUrl);
urlRouter.post("/", shortenURL);
urlRouter.put("/:shortCode", updateUrl);
urlRouter.delete("/:shortCode", deleteUrl);

module.exports = urlRouter;
