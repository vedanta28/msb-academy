const express = require("express");
const router = express.Router();
const {getAllCourses, getCourse, updateCourse, deleteCourse, createCourse}= require("../controllers/courseController");
const {protect, restricted} = require("../controllers/authController");

router.route('/').get(getAllCourses).post(protect, restricted, createCourse); 
router.route('/:id').get(protect, getCourse).put(protect, restricted, updateCourse).delete(protect, restrict, deleteCourse);

router.route
module.exports=router;