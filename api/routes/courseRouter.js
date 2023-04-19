const express = require("express");
const router = express.Router();

const {
  getAllCourses,
  getCourse,
  createCourse,
  addVideo,
  deleteVideo,
} = require("../controllers/courseController");

const { protect, restricted } = require("../controllers/authController");

router.route("/").get(getAllCourses).post(protect, restricted, createCourse);
router
  .route("/:id")
  .get(protect, getCourse)
  .put(protect, restricted, addVideo)

router.route("/deleteVideo")
  .delete(protect, restricted, deleteVideo);

module.exports = router;