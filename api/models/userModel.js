const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const userSchema = new mongoose.Schema({
  fname: {
    type: String,
    required: [true, "A User must have a name"],
  },
  lname: {
    type: String,
  },
  state: {
    type: String,
    required: [true, "A User must have a state"],
  },
  country: {
    type: String,
    required: [true, "A User must have a country"],
  },
  password: {
    type: String,
    required: [true, "A User must have a password"],
  },
  image: {
    type: String,
    default: function () {
      return this._id + ".jpg";
    },
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
    unique: true,
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
  ]
});

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
  }
  next();
});

userSchema.methods.correctPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const User = mongoose.model("User", userSchema);
module.exports = User;
