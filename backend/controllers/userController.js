const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, password, email } = req.body;

  //Check if all fields are there

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please enter all fields");
  }

  //Check if user already exists

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("The user already exists");
  }

  //Hash Password

  const salt = await bcrypt.genSalt(10);

  const hashedPassword = await bcrypt.hash(password, salt);

  //Create the user

  const user = await User.create({
    name: name,
    email: email,
    password: hashedPassword,
  });

  //Check if user was successfully created

  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("User was not created");
  }
});

// @desc    Login a user
// @route   POST api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  //find user by matching email

  const user = await User.findOne({ email });

  //validating user through password

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid Credentials");
  }
});

// @desc    Get the info of current user
// @route   GET api/users/me
// @access  Private
const getMe = asyncHandler(async (req, res) => {
  res.status(200).json(req.user);
});

//function to generate jwt token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = {
  registerUser,
  loginUser,
  getMe,
};
