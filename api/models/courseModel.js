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
  rating: {
    type: Number,
    default: 4.5,
  },
  language: {
    type: String,
    default: "English",
  },
  imageCover: {
    type: String,
    default: function () {
      return this._id + ".jpg";
    },
  },
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
  insrtuctorID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});
const Course = mongoose.model("Course", courseSchema);
module.exports = Course;
