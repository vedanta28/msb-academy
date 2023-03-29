const moongose = require('mongoose');
const studentSchema = new moongose.Schema({
    name: {
        type: String,
        required: [true, 'A Student must have a name']
    },
    image: {
        type: String,
        default: 'default.jpg'
    },
    isSuper: {
        type: Boolean,
        default:0
    },
    phoneNo: {
        type: String
    },
    emailId: {
        type: String
    },
    dob: {
        type: Date
    },
    courses: {
        type: [{
            name: String,
            fees: Number,
            description: String,
            rating: Number,
            imageCover: String,
            duration: Number,
        }]
    },
    payments: {
        type: [{
            courseName: String,
            amount: Number,
            paymentDate: Date,
            paymentType: Boolean,
            paymentStatus: String
        }]
    },
    comments: {
        type: [{
            commentID: String,
            parentID: String,
            text: String
        }]
    }

},
{collection: 'students'}
);
const Student = moongose.model('Student', studentSchema);
module.exports = Student;