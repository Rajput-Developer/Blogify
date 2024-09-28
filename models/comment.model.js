import { Schema, model } from 'mongoose'

const commentSchema = new Schema({
    content: {
        type: String,
        required: true,
    },
    blogId: {
        type: Schema.Types.ObjectId,
        ref: 'Blog'
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})

const Comment = model('Comment', commentSchema);

export default Comment;