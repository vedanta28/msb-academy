const express = require("express");
const router = express.Router();

const {
  orderPayment,
  verifyPayment,
} = require("../controllers/paymentController");

const { protect } = require("../controllers/authController");

router.post("/order", orderPayment);
router.post("/verify", verifyPayment);

module.exports = router;