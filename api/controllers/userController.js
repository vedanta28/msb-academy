const User = require("../models/userModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

exports.updateDetails = catchAsync(async (req, res, next) => {
  let updatedUser = req.user;
  updatedUser.fname = req.body.fname || updatedUser.fname;
  updatedUser.lname = req.body.lname || updatedUser.lname;
  updatedUser.state = req.body.state || updatedUser.state;
  updatedUser.country = req.body.country || updatedUser.country;
  updatedUser.phoneNo = req.body.phoneNo || updatedUser.phoneNo;

  updatedUser = await User.findByIdAndUpdate(req.user._id, updatedUser, {
    new: true,
    runValidators: true,
  });

  updatedUser.password = undefined; 
  res.status(200).json({
    message: "User Updated",
    updatedUser,
  });
});

exports.updatePassword = catchAsync(async (req, res, next) => {
  let updatedUser = req.user;
  const oldPassword = req.body.oldPassword;
  const newPassword = req.body.newPassword;
  
  if (!(await updatedUser.correctPassword(oldPassword)))
    return next(new AppError("Incorrect Password", 401));
  
  updatedUser.password = newPassword;

  updatedUser = await User.findByIdAndUpdate(req.user._id, updatedUser, {
    new: true,
    runValidators: true,
  });

  updatedUser.password = undefined;
  res.status(200).json({
    message: "Passoword Updated",
    updatedUser,
  });
});