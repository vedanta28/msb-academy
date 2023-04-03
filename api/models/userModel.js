const mongoose = require("mongoose");
const bcrypt=require("bcryptjs");
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
    ],
  }
);


userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
    // delete password confirm field before saving
    //this.passwordChangedAt = Date.now();
    //this.passwordConfirm = undefined;
  }
  next();
});

// Instance Method: available on all documents of a certain collection
userSchema.methods.correctPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");
  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
  return resetToken;
};

const User = mongoose.model("User", userSchema);
module.exports = User;