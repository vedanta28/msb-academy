const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const sendEmail = require("../utils/email");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const User = require("../models/userModel");

const signToken = (id) => {
  //jwt.sign({payload}, secret, {options})
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const sendCookie = (res, token) => {
  const options = {
    expires: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
    httpOnly: true, // only read and send, no modifications allowed
  };
  if (process.env.NODE_ENV !== "development") options.secure = true;
  res.cookie("jwt", token, options);
};

exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });

  const token = signToken(newUser._id);
  newUser.password = undefined;
  sendCookie(res, token);
  res.status(201).json({ status: "success", token, user: newUser });
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // check if email and password exists
  if (!email || !password)
    return next(new AppError("Please provide email and password", 400));

  // check if user exists && password is correct
  const user = await User.findOne({ email });
  if (!user || !(await user.correctPassword(password)))
    return next(new AppError("Incorrect Email or Password", 401));

  // if everything ok, send token to client
  const token = signToken(user._id);
  sendCookie(res, token);
  res.status(200).json({ status: "success", token });
});

exports.protect = catchAsync(async (req, res, next) => {
  // Getting the token and check if it exists
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  )
    token = req.headers.authorization.split(" ")[1];

  if (!token)
    return next(
      new AppError("You are not logged in! Please log in to get access", 401)
    );

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

exports.restrictTo = (...roles) => {
  return catchAsync(async (req, res, next) => {
    if (!roles.includes(req.user.role))
      return next(
        new AppError("You do not have permission to perform this action", 403)
      );
    next();
  });
};

exports.forgotPassword = catchAsync(async (req, res, next) => {
  // Get user based on POSTed email
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new AppError("There is no user with that email address"));
  }

  // Generate the random reset token
  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false }); // very important
  // this reset token is sent to user and is not the encrypted one

  // Generate resetURL and send to user via nodemailer
  const resetURL = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/resetPassword/${resetToken}`;

  try {
    await sendEmail({
      email: req.body.email,
      subject: "Password Reset Token",
      message: `Click on the following link ${resetURL} to reset password.`,
    });
    res.status(200).json({ status: "success", message: "Token sent to email" });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });
    return next(
      new AppError("There was an Error sending the email. Try again later", 500)
    );
  }
});

exports.resetPassword = catchAsync(async (req, res, next) => {
  // 1) Get User Based on the token
  const hashedToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  // 2) If token has not expired and there is user, set the new password
  if (!user) {
    return next(new AppError("Token is invalid or has expired", 400));
  }
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();

  // 3) log the user in, send JWT
  const token = signToken(user._id);
  sendCookie(res, token);
  res.status(200).json({ status: "success", token });
});

exports.logout = catchAsync(async(req,res,next) => {
  const token = "LoggedOut";
  res.cookie("jwt", token, {
    expires: new Date(Date.now() + 1000),
    httpOnly: true,
  })
  res.status(200).json({
    status: "success",
    token,
  })
})