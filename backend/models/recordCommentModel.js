import { Schema, model } from "mongoose";

const recordCommentSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        required: true
    }
}, {timestamps: true})

const RecordComment = model('RecordComment', recordCommentSchema);

export default RecordComment;