const mongoose= require('mongoose');
const videoSchema = new mongoose.Schema({
    videoID: String,
    vName: String,
    vLink: String,
    courseID: String,
    courseName: String,
    instructorID: String,
    instructorName: String,
},
{collection : 'videos'}
);