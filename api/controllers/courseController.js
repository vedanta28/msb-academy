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

// Add A New Course
exports.createCourse = catchAsync(async (req, res, next) => {
  let course = {...req.body, instructorID: req.user._id, videos: [], instructorName: req.user.fname + " " + req.user.lname};
  const newCourse = await Course.create(course);
  
  const user = req.user;
  user.courseTaken.push({course: newCourse._id});
  await user.save({ validateBeforeSave: false });

  res.status(201).json({
    status: "success",
    course: newCourse,
  });
});

// Add A New Video To A Course
exports.addVideo = catchAsync(async (req, res, next) => {
  // Await The Required Course
  const course = await Course.findById(req.params.id);

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
    vID: course.videos.length + 1,
    vName: req.body.videoName,
    vLink: req.body.videoLink,
    vDuration: req.body.videoDuration,
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
