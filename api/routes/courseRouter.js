const express = require("express");
const router = express.Router();

const {
  getAllCourses,
  getCourse,
  createCourse,
  addVideo,
} = require("../controllers/courseController");

const { protect, restricted } = require("../controllers/authController");

router.route("/").get(getAllCourses).post(protect, restricted, createCourse);
router
  .route("/:id")
  .get(protect, getCourse)
  .post(protect, restricted, addVideo);

module.exports = router;
