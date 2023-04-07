const sharp = require("sharp");
const multer = require("multer");
const User = require("../models/userModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const bcrypt=require("bcryptjs");

// Simple
// const upload = multer({ dest: 'public/img/users'})
// destination stores in disk, otherwise in memory
// exports.uploadPhoto = upload.single('photo')

// Disk Storage
// const multerStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "public/img/users");
//   },
//   filename: (req, file, cb) => {
//     const ext = file.mimetype.split("/")[1];
//     let name = `user-${req.user._id}-${Date.now()}.${ext}`;
//     cb(null, name);
//   },
// });

// Memory Storage
const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) cb(null, true);
  else cb(new AppError("Not an Image! Please upload only images.", 400), false);
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadPhoto = upload.single("photo");

exports.resizePhoto = (req, res, next) => {
  if (!req.file) return next();

  req.file.filename = `user-${req.user._id}-${Date.now()}.jpeg`;

  sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`public/img/users/${req.file.filename}`);
};

exports.updateMe = catchAsync(async (req, res, next) => {
  let updatedUser = req.user;
  updatedUser.fname = req.body.fname || updatedUser.fname;
  updatedUser.lname = req.body.lname || updatedUser.lname;
  updatedUser.state = req.body.state || updatedUser.state;
  updatedUser.country = req.body.country || updatedUser.country;
  updatedUser.phoneNo = req.body.phoneNo || updatedUser.phoneNo;

  //   password: req.body.password,

  updatedUser = await User.findByIdAndUpdate(req.user._id, updatedUser, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    message: "User Updated",
    updatedUser,
  });
});

exports.updatePass = catchAsync(async (req, res, next) => {
  let updatedUser = req.user;
  const oldPassword = req.body.oldPassword;
  const newPassword = req.body.newPassword;
  const confirmPassword = req.body.confirmPassword;
  if (!updatedUser || !(await updatedUser.correctPassword(oldPassword)))
    return next(new AppError("Incorrect Password", 401));
  if (newPassword !== confirmPassword)
    return next(new AppError("Passwords do not match", 401));
  updatedUser.password = newPassword;

  updatedUser = await User.findByIdAndUpdate(req.user._id, updatedUser, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    message: "Passoword Updated",
    updatedUser,
  });
});