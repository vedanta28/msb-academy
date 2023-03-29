const mongoose= require('mongoose');
const courseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A Course must have a name'],
        unique: true
    },
    fees: {
        type: Number,
        default: 0
    },
    description: {
        type: String,
        trim: true
    },
    rating: {
        type: Number,
        default: 0
    },
    imageCover: {
        type: String,
        default: 'default.jpg'
    },
    duration: {
        type: Number, // in weeks
    },
    videos: {
        type:[{
            videoID: String,
            vName: String,
            vLink: String,
        }]
    },
    comments: {
        type: [{
            commentID: String,
            parentID: String,
            text: String,
            commentBy: String,
        }]
    },
    insrtuctors: {
        type: [{
            instructorID: String,
            name: String,
            image: String,
            phoneNo: String,
            emailId: String,
            dob: Date
        }]
    },
    students: {
        type: [{
            studentID: String,
            name: String,
            image: String,
            phoneNo: String,
            emailId: String,
            dob: Date
        }]
    }
},
{
    collection: 'courses'
}
);
const Course = mongoose.model('Course', courseSchema);
module.exports = Course;