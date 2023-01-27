import { model, Schema, ObjectId } from 'mongoose'

const recordSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      unique: true,
    },
    url: {
      type: String,
      required: true,
    },
    comments: [
      {
        type: ObjectId,
        ref: "RecordComment"
      }
    ]
  },
  {
    timestamps: true,
  }
)

const Record = model('Record', recordSchema)

export default Record