const express = require("express");
const router = express.Router();
const {updateMe, uploadPhoto, resizePhoto, updatePass} = require("../controllers/userController")
const { signup, signin, forgotPassword, resetPassword, protect, logout } = require("../controllers/authController");

router.post("/signup",signup);
router.post("/signin",signin);
router.get("/logout",logout);
router.put("/user-details", protect, updateMe);
router.put("/user-pass", protect, updatePass);

// router.post("/forgotPassword", forgotPassword);
// router.post("/resetPassword/:token",resetPassword);
// router.post("/me", protect, uploadPhoto, resizePhoto , updateMe);
module.exports = router;