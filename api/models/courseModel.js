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
  videos: {
    type: [
      {
        vID: Number,
        vName: String,
        vLink: String,
        vDuration: Number,
        vDate: {
          type: Date,
          default: Date.now()
        }
      },
    ],
  },
  instructorID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "A Course must have an instructor"],
  },
  instructorName: {
    type: String,
  },
  rating: {
    type: Number,
    default: 0,
  }
});

const Course = mongoose.model("Course", courseSchema);
module.exports = Course;