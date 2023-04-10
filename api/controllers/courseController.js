const User = require("../models/userModel");
const Course = require("../models/courseModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

// Get All Courses
exports.getAllCourses = catchAsync(async (req, res, next) => {
  const courses = await Course.find().select("-videos");
  res.status(200).json({
    status: "success",
    length: courses.length,
    courses,
  });
});

// Add A New Course
exports.createCourse = catchAsync(async (req, res, next) => {
  const newCourse = await Course.create(req.body);
  res.status(201).json({
    status: "success",
    course: newCourse,
  });
});

// Get A Course By ID
exports.getCourse = catchAsync(async (req, res, next) => {
  const course = await Course.findById(req.params.id);
  if (!course) {
    return next(new AppError("No course found with that ID", 404));
  }
  res.status(200).json({
    status: "success",
    course,
  });
});

// Add A New Video To A Course
exports.updateCourse = catchAsync(async (req, res, next) => {
  // Await The Required Course
  const course = await Course.findById(req.params.id);
  console.log(course);

  // If No Course Found, Throw An Error
  if (!course) {
    return next(new AppError("No course found with that ID", 404));
  }

  // Only Instructor of The Course Can Update It
  const user = req.user;
  if (course.instructorID.toString() !== user._id.toString()) {
    return next(
      new AppError("You are not authorized to update this course", 401)
    );
  }

  // Push The New Video To The Videos Array
  const video = {
    vID: req.body.vID,
    vName: req.body.vName,
    vLink: req.body.vLink,
  };
  console.log(video);
  course.videos.push(video);

  // Save The Updated Course
  await course.save({ validateBeforeSave: false });

  // Send The Updated Course
  res.status(200).json({
    status: "success",
    course,
  });
});

// Delete A Course
exports.deleteVideo = catchAsync(async (req, res, next) => {
  
  // Only Instructor of The Course Can Delete It
  const course = await Course.findById(req.params.id);
  if (!course) {
    return next(new AppError("No course found with that ID", 404));
  }

  const video = course.videos.find((video) => video._id == req.body.vID);
  if (!video) {
    return next(new AppError("No video found with that ID", 404));
  }

  // Only Instructor of The Course Can Delete It
  const user = req.user;
  if (course.insrtuctorID.toString() !== user._id.toString()) {
    return next(
      new AppError("You are not authorized to delete material of this course", 401)
    );
  }

  // Delete The Course
  const index = course.videos.indexOf(video);
  course.videos.splice(index, 1);
  await course.save({ validateBeforeSave: false });
  
  // Send The Response
  res.status(204).json({
    status: "success",
    data: null,
  });
});