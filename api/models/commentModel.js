const mongoose= require('mongoose');
const commentSchema = new mongoose.Schema({
    commentID: String,
    parentID: String,
    text: String,
    commentBy: String,
    commentDate: Date
},
{collection : 'comments'}
);
const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;