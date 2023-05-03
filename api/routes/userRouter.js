const express = require("express");
const router = express.Router();

const {
  updateDetails,
  updatePassword,
  addCourse,
  removeCourse,
  getCheckout,
  getClassroom,
  getDetails,
  updateRating,
  myCourse
} = require("../controllers/userController");

const {
  signup,
  signin,
  protect,
  logout,
} = require("../controllers/authController");

router.post("/signup", signup);
router.post("/signin", signin);
router.get("/logout", logout);

router.post("/add-course", protect, addCourse);
router.post("/myCourse", protect, myCourse);
router.post("/remove-Course", protect, removeCourse);

router.route("/user-details")
.get(protect, getDetails)
.put(protect, updateDetails);

router.put("/update-rating", protect, updateRating);

router.get("/checkout", protect, getCheckout);
router.get("/classroom", protect, getClassroom);

module.exports = router;