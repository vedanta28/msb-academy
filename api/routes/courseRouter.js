const express = require("express");
const router = express.Router();
const {getAllCourses, getCourse, updateCourse, deleteCourse, createCourse}= require("../controllers/courseController");

router.route('/').get(getAllCourses).post(createCourse); 
router.route('/:id').get(getCourse).put(updateCourse).delete(deleteCourse);

router.route
module.exports=router;