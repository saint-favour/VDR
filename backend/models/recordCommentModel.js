import mongoose, {model, Schema} from 'mongoose'

const commentSchema = new Schema({
   name: {
    type: String,
    required: true
   },

    comment: {
        type: "string",
        required: true
    },

    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Record'
    }],

    dislike:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Record'
    }],
},
{
    timestamps: true,
  }

) 

const RecordComment = model('comment', commentSchema)

export default RecordComment