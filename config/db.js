const mongoose = require("mongoose");

const url =
  "mongodb+srv://siddharth:12345@cluster-1.lvvs0tz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster-1";

const connectDB = mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Atlas connected"))
  .catch((err) => console.error("Connection error:", err));

module.exports = connectDB;
