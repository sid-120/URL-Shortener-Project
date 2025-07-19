const mongoose = require("mongoose");

const authSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please enter a valid email address"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: 6,
  },
});

// Login Event Schema
const loginEventSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  loggedInAt: {
    type: Date,
    default: Date.now,
  },
});

const Auth = mongoose.model("Auth", authSchema);
const LoginEvent = mongoose.model("LoginEvent", loginEventSchema);

module.exports = { Auth, LoginEvent };
