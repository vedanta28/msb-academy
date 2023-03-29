const  moongoose = require('mongoose');
const paymentSchema = new moongoose.Schema({
    courseName: String,
    amount: Number,
    paymentDate: Date,
    paymentType: Boolean,
    paymentStatus: String,
    student:{
        type:{
            studentID: String,
            name: String,
            image: String,
            phoneNo: String,
            emailId: String,
            dob: Date
        }
    }
},
{collection: 'payments'}
);
const Payment = moongoose.model('Payment', paymentSchema);
module.exports = Payment;