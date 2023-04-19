const express = require("express");
const router = express.Router();

const {
  orderPayment,
  verifyPayment,
} = require("../controllers/paymentController");

const { protect } = require("../controllers/authController");

router.post("/order", protect, orderPayment);
router.post("/verify", protect, verifyPayment);

module.exports = router;