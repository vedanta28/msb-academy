const express = require("express");
const router = express.Router();

const {
  updateDetails,
  updatePassword,
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
router.put("/user-details", protect, updateDetails);
router.put("/user-password", protect, updatePassword);
module.exports = router;