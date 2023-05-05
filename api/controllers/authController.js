const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

// Sign Token and send it to client
const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

// Send Token to client in a cookie
const sendCookie = (res, token) => {
  const options = {
    expires: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
    httpOnly: true, // only read and send, no modifications allowed
  };
  if (process.env.NODE_ENV !== "development") options.secure = true;
  res.cookie("jwt", token, options);
};

// Sign Up New User
exports.signup = catchAsync(async (req, res, next) => {
  const { fname, lname, state, country, phoneNo, emailId, role, dob, password } = req.body;
  const newUser = await User.create({
    fname, lname, state, country, phoneNo, emailId, role, dob, password
  });
  const token = signToken(newUser._id);
  sendCookie(res, token);
  res.status(201).json({ token, image: newUser.image });
});

// Login User
exports.signin = catchAsync(async (req, res, next) => {
  const { emailId, password } = req.body;
  // check if email and password exists
  if (!emailId || !password)
    return next(new AppError("Please provide email and password", 400));

  // check if user exists && password is correct
  const user = await User.findOne({ emailId });
  if (!user || !(await user.correctPassword(password)))
    return next(new AppError("Incorrect Email or Password", 403));

  // if everything ok, send token to client
  const token = signToken(user._id);
  sendCookie(res, token);
  res.status(200).json({ token, image: user.image });
});

// Check if user is logged in
exports.protect = catchAsync(async (req, res, next) => {
  // Getting the token and check if it exists
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer"))
    token = req.headers.authorization.split(" ")[1];

  if (!token)
    return next( new AppError("You are not logged in! Please log in to get access", 401));

  // Decode the token by verifying it
  const { id } = jwt.verify(token, process.env.JWT_SECRET);

  // Check if User still exists
  const freshUser = await User.findById(id);
  if (!freshUser) {
    return next(new AppError("The User does not exist", 401));
  }
  req.user = freshUser;
  next();
});

// Check if user is Instructor
exports.restricted = catchAsync(async (req, res, next) => {
  if (req.user.role != "Instructor") {
    return next(
      new AppError("You do not have permission to perform this action", 403)
    );
  }
  next();
});

// Logout User
exports.logout = catchAsync(async (req, res, next) => {
  const token = "LoggedOut";
  res.cookie("jwt", token, {
    expires: new Date(Date.now() + 1000),
    httpOnly: true,
  });
  res.status(200).json({ token });
});

// Route to Handle Password Change
exports.changePassword = catchAsync(async (req, res, next) => {
  
  // 1) Get user from collection
  const user = await User.findById(req.user._id).select('+password');

  // 2) Check if POSTed current password is correct
  if (!(await user.correctPassword(req.body.oldPassword, user.password))) {
    return next(new AppError('Your current password is wrong.', 401));
  }

  // 3) If so, update password
  user.password = req.body.newPassword;
  await user.save();

  // 4) Log user in, send JWT
  const token = signToken(user._id);
  sendCookie(res, token);
  res.status(200).json({ token, image: user.image });
});