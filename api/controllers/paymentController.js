const AppError = require("../utils/appError");
const Razorpay = require("razorpay");
const catchAsync = require("../utils/catchAsync");
const crypto = require("crypto");
const Payment = require("../models/paymentModel");
const Course = require("../models/courseModel");
const mongoose = require("mongoose");

// order payment
exports.orderPayment = catchAsync(async (req, res, next) => {
  // calculate the amount to be paid by the user

  let amount = 0;
  const courses = req.body.courses;

  const records = await Course.find({ '_id': { $in: courses } }).select("fees");
  records.forEach( e => amount += e.fees )

  let instance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY,
    key_secret: process.env.RAZORPAY_SECRET,
  });

  let options = {
    amount: amount * 100,
    currency: "INR",
    receipt: crypto.randomBytes(20).toString("hex"),
  };

  const response = await instance.orders.create(options);
  if (!response) return next(new AppError("Payment Failed", 500));

  res.status(200).json({
    message: "Payment Successful",
    response,
  });
});

// verify payment
exports.verifyPayment = catchAsync(async (req, res, next) => {

  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body.response;

  const secret = process.env.RAZORPAY_SECRET;
  const sign = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSign = crypto
    .createHmac("sha256", secret)
    .update(sign.toString())
    .digest("hex");

  // To Add to Payment Model
  let purchasedCourses = [];

  if (expectedSign === razorpay_signature) {
    // add the course to the user's course list
    const user = req.user;
    const size = user.wishlist.length;

    for (let i = 0; i < size; i++) {
      const course = user.wishlist[i];
      user.courseTaken.push({course});
      purchasedCourses.push(course);
    }

    user.wishlist = [];
    await user.save({ validateBeforeSave: false });

    const purchase = {
      paymentID: razorpay_payment_id,
      status: true,
      coursesList: purchasedCourses,
      purchasedBy: user._id,
    }

    const newPayment = await Payment.create({
      paymentID: razorpay_payment_id,
      status: true,
      coursesList: purchasedCourses,
      purchasedBy: user._id,
    });

    console.log(purchase);

    res.status(200).json({
      message: "Payment Verified",
      user,
      newPayment,
    });
  } else {

    const user = req.user;
    await Payment.create({
      paymentID: razorpay_payment_id,
      status: false,
      coursesList: purchasedCourses,
      purchasedBy: user._id,
    });

    return next(new AppError("Payment Failed", 500));
  }
});
