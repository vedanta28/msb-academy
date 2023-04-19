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
      course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
      },
      rating: {
        type: Number,
        min: 0,
        max: 5,
        default: 0,
        validate: {
          validator: function (v) {
            return Number.isInteger(v * 2);
          },
          message: "Rating can only be incremented by 0.5",
        },
      },
    },
  ],
  wishlist: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    },
  ],
});


// Pre Save Hook to hash password
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
  }
  next();
});


// Instance Function to check if password is correct
userSchema.methods.correctPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};


const User = mongoose.model("User", userSchema);
module.exports = User;
