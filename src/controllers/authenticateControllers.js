const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { Auth, LoginEvent } = require("../models/authenticateModel.js");

// Login user functions
const loginUser = async (req, res) => {
  const logins = await LoginEvent.find().sort({ loggedInAt: -1 });
  res.json(logins);
};

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
  try {
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

    // console.log("User signed in:", user.email);

    // generating a token for the user and my secret key here is 'secret'
    const token = jwt.sign({ email: user.email, userId: user._id }, "secret", {
      expiresIn: "1h",
    });
    // res.status(200).json({
    //   message: "Signed in successfully",
    //   token,
    //   userId: user._id,
    //   email: user.email,
    // });

    // save login event

    await LoginEvent.create({ email: user.email });
    res.status(200).json({
      message: "Successfully signed in users list",
      user: { token, id: user._id, email: user.email },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// exporting both functions signup() and signin()
module.exports = { signup, signin, loginUser };
