const  mongoose = require('mongoose');
const paymentSchema = new mongoose.Schema({
    courseList: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
      }
    ],
    amount: Number,
    paymentDate: Date,
    paymentType: Boolean,
    paymentStatus: String,
    purchaseBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
});

const Payment = mongoose.model('Payment', paymentSchema);
module.exports = Payment;