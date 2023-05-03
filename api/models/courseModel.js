const mongoose = require("mongoose");
const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A Course must have a name"],
    unique: true,
  },
  fees: {
    type: Number,
    default: 500,
  },
  description: {
    type: String,
    trim: true,
  },
  imageCover: {
    type: String,
    default: function () {
      return this._id + ".jpg";
    },
    immutable: true,
  },
  // startDate: {
  //   type: Date,
  //   required: [true, "Start Date is required"],
  // },
  // endDate: {
  //   type: Date,
  // },
  duration: {
    type: Number, // in weeks
  },
  videos: {
    type: [
      {
        vID: String,
        vName: String,
        vLink: String,
        vDate: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  instructorID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "A Course must have an instructor"],
  },
  rating: {
    type: Number,
    default: 0,
  }
});

const Course = mongoose.model("Course", courseSchema);
module.exports = Course;
