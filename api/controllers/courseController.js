const Course = require("../models/courseModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

// Get All Courses
exports.getAllCourses = catchAsync(async (req, res, next) => {
  const courses = await Course.find();
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

  // If No Course Found, Throw An Error
  if (!course) {
    return next(new AppError("No course found with that ID", 404));
  }

  // // Only Instructor of The Course Can Update It

  // const user = req.user;
  // if (course.insrtuctorID.toString() !== user._id.toString()) {
  //   return next(
  //     new AppError("You are not authorized to update this course", 401)
  //   );
  // }

  // Push The New Video To The Videos Array
  const video = {
    vID: req.body.vID,
    vName: req.body.vName,
    vLink: req.body.vLink,
  };
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
exports.deleteCourse = catchAsync(async (req, res, next) => {
  // Only Instructor of The Course Can Delete It

  // const user = req.user;
  // if (course.insrtuctorID.toString() !== user._id.toString()) {
  //   return next(
  //     new AppError("You are not authorized to delete this course", 401)
  //   );
  // }

  // Delete The Course
  const course = await Course.findByIdAndDelete(req.params.id);
  if (!course) {
    return next(new AppError("No course found with that ID", 404));
  }

  // Delete The Course From All Users
  const users = await User.find();
  users.forEach(async (user) => {
    if (user.courses.includes(course._id)) {
      const index = user.courses.indexOf(course._id);
      user.courses.splice(index, 1);
      await user.save({ validateBeforeSave: false });
    }
  });

  // Send The Response
  res.status(204).json({
    status: "success",
    data: null,
  });
});
