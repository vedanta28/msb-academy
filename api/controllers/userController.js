const User = require("../models/userModel");
const Course = require("../models/courseModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

// Get User Details
exports.getDetails = catchAsync(async (req, res, next) => {
  const fetchedUser = await User.findById(req.user._id);
  res.status(200).json({
    message: "Success",
    fetchedUser,
  });
});

// Get User Details
exports.myCourse = catchAsync(async (req, res, next) => {
  const fetchedUser = await User.findById(req.user._id);
  let bought = false;

  fetchedUser.courseTaken.forEach( e => {
    if ( e.course === req.body.courseID)
        bought = true
  })

  res.status(200).json({
    message: "Success",
    bought
  });
});

// Update User Details
exports.updateDetails = catchAsync(async (req, res, next) => {
  console.log(req);
  let updatedUser = req.user;
  updatedUser.fname = req.body.fname || updatedUser.fname;
  updatedUser.lname = req.body.lname || updatedUser.lname;
  updatedUser.state = req.body.state || updatedUser.state;
  updatedUser.country = req.body.country || updatedUser.country;
  updatedUser.phoneNo = req.body.phoneNo || updatedUser.phoneNo;

  await updatedUser.save({ runValidators: true, new: true });

  updatedUser.password = undefined;
  res.status(200).json({
    message: "User Updated",
    updatedUser,
  });
});

// Update Password
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

// Add Course to Wishlist
exports.addCourse = catchAsync(async (req, res, next) => {
  const courseID = req.body.courseID;

  if (!courseID || !(await Course.findById(courseID)))
    return next(
      new AppError("Course ID not provided or Course Does Not Exist", 404)
    );

  const user = req.user;

  if (!user.wishlist.includes(courseID)) {
    user.wishlist.push(courseID);
    await user.save({ validateBeforeSave: false });
  }

  res.status(200).json({
    message: "Course Added",
    user,
  });
});

// Remove Course from Wishlist
exports.removeCourse = catchAsync(async (req, res, next) => {
  const courseID = req.body.courseID;

  if (!courseID || !(await Course.findById(courseID)))
    return next(
      new AppError("Course ID not provided or Course Does Not Exist", 404)
    );

  const user = req.user;

  const index = user.wishlist.indexOf(courseID);
  if (index > -1) {
    user.wishlist.splice(index, 1);
  }

  await user.save({ validateBeforeSave: false });
  res.status(200).json({
    message: "Course Removed",
    user,
  });
});

// Get Wishlist
exports.getCheckout = catchAsync(async (req, res, next) => {
  let t = await req.user.populate("wishlist");
  const cart = t.wishlist;
  res.status(200).json({
    status: "success",
    cart,
  });
  next();
});

// Get Classroom
exports.getClassroom = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user._id).populate("courseTaken.course");
  const classroom = user.courseTaken;
  res.status(200).json({
    status: "success",
    classroom,
  });
  next();
});

// Update Rating
exports.updateRating = catchAsync(async (req, res, next) => {
  const courseID = req.body.courseID;
  const rating = req.body.rating;
  const user = req.user;

  await User.findOneAndUpdate(
    { _id: user._id, "courseTaken.course": courseID },
    { $set: { "courseTaken.$.rating": rating } },
    { new: true }
  )
    .then((updatedUser) => {
      if (updatedUser) {
        console.log(`Done`);
      } else {
        console.log(`Not Done`);
      }
      
    })
    .catch((error) => {
      console.error(error);
    });
    let totalRating = 0;
    let numOfUsers = 0;
    for await (const doc of User.find()) {
      for (let i = 0; i < doc.courseTaken.length; i++) {
        if (doc.courseTaken[i].course == courseID && doc.courseTaken[i].rating != 0) {
          totalRating += doc.courseTaken[i].rating;
          numOfUsers++;
        }
      }
    }
    let averageRating = totalRating/numOfUsers;
    console.log("Avg" + averageRating);
    Course.findOneAndUpdate(
      { _id: courseID },
      { $set: { rating: averageRating } },
      { new: true }
    ).then((updatedUser) => {
      if (updatedUser) {
        console.log(`Done`);
      } else {
        console.log(`Not Done`);
      }
    })
    .catch((error) => {
      console.error(error);
    });
});
