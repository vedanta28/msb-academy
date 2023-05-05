const express = require("express");
const router = express.Router();

const {
  updateDetails,
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
  changePassword
} = require("../controllers/authController");

router.post("/signup", signup);
router.post("/signin", signin);
router.get("/logout", logout);

router.post("/add-course", protect, addCourse);
router.post("/my-course", protect, myCourse);
router.post("/remove-course", protect, removeCourse);
router.post("/update-rating", protect, updateRating);
router.post("/change-password", protect, changePassword);

router.route("/user-details")
.get(protect, getDetails)
.post(protect, updateDetails);

router.get("/checkout", protect, getCheckout);
router.get("/classroom", protect, getClassroom);

module.exports = router;