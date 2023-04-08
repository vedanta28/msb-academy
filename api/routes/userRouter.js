const express = require("express");
const router = express.Router();

const {
  updateDetails,
  updatePassword,
  addCourse,
  removeCourse,
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
router.post("/remove-Course", protect, removeCourse);

router.put("/user-details", protect, updateDetails);
router.put("/user-password", protect, updatePassword);

module.exports = router;