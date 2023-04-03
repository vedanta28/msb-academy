const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    fname: {
      type: String,
      required: [true, "A User must have a name"],
    },
    lname: {
      type: String,
    },
    state: {
      type: String,
      required: [true, "A User must have a state"]
    },
    country: {
      type: String,
      required: [true, "A User must have a country"]
    },
    password: {
      type: String,
      required: [true, "A User must have a password"],
    },
    image: {
      type: String,
      default: "default.jpg",
    },
    role: {
      type: String,
      enum: ["Student", "Instructor"],
      default: "Student",
    },
    phoneNo: {
      type: String,
      validate: {
        validator: function (v) {
          return /\d{10}/.test(v);
        },
        message: (props) =>
          `${props.value} is not a valid phone number. Must be 10 digits long.`,
      },
      required: [true, "Phone number is required"],
    },
    emailId: {
      type: String,
      required: true,
      validate: {
        validator: function (v) {
          return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v);
        },
        message: (props) => `${props.value} is not a valid email address!`,
      },
    },
    dob: {
      type: Date,
      required: [true, "Date of Birth is required"],
    },
    courseTaken: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
      },
    ],
    wishlist: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
      },
    ],
  },
  { collection: "Users" }
);
const User = mongoose.model("User", userSchema);
module.exports = User;
