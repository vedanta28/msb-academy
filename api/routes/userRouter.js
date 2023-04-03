const express = require("express");
const router = express.Router();
const {updateMe, uploadPhoto, resizePhoto} = require("../controllers/userController")
const { signup, login, forgotPassword, resetPassword, protect, logout } = require("../controllers/authController");

// router.route("/signup").post(signup);
router.post("/signup",signup);
router.post("/login",login);
router.get("/logout",logout);

router.post("/forgotPassword", forgotPassword);
router.post("/resetPassword/:token",resetPassword);

router.post("/me", protect, uploadPhoto, resizePhoto , updateMe);

module.exports = router;