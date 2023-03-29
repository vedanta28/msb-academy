const moongose = require('mongoose');
const instructorSchema = new moongose.Schema({
    name: {
        type: String,
        required: [true, 'An Instructor must have a name'],
    },
    image: {
        type: String,
        default: 'default.jpg'
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
    }    
},
{collection: 'instructors'}
);
const Instructor = moongose.model('Instructor', instructorSchema);
module.exports = Instructor;