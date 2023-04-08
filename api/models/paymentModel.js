const mongoose = require("mongoose");
const paymentSchema = new mongoose.Schema({
  paymentID: {
    type: String,
    required: [true, "Payment ID is required"],
  },

  status: Boolean,

  courseList: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    },
  ],

  purchasedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const Payment = mongoose.model("Payment", paymentSchema);
module.exports = Payment;
