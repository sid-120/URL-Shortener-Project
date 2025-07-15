const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Auth = require("../models/authenticateModel.js");

// Signup function
const signup = async (req, res) => {
  const { email, password, confirmPassword } = req.body;
  // checking whether the user already exists by finding
  const user = await Auth.findOne({ email });
  if (user) {
    return res.status(400).json({ message: "User already exist" });
  }
  // Checking for password and confirmPassword to be same
  if (password !== confirmPassword) {
    return res.status(400).json({ message: "password do not match" });
  }

  // encrypting the password by bcrypt.hash for 12 rounds, the 12 rounds stays as a secret
  const hashedPassword = await bcrypt.hash(password, 12);
  const newUser = new Auth({ email, password: hashedPassword });
  await newUser.save();
  res.status(201).json({ message: "User created successfully" });
};

// SignIn function
const signin = async (req, res) => {
  const { email, password } = req.body;
  // finding the user is present or not from the database
  const user = await Auth.findOne({ email });
  //    error if user not exist
  if (!user) {
    return res.status(400).json({ message: "User does not exist" });
  }
  // checking for the correctness of the password
  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) {
    return res.status(400).json({ message: "Invalid password" });
  }

  // generating a token for the user and my secret key here is 'secret'
  const token = jwt.sign({ email: user.email, userId: user._id }, "secret", {
    expiresIn: "1h",
  });
  res.status(200).json({ token, userId: user._id, email: user.email });
};

// exporting both functions signup() and signin()
module.exports = { signup, signin };
