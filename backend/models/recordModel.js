import pkg from 'mongoose'
const { model, Schema } = pkg
import bcrypt from 'bcryptjs'

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
  },
  {
    timestamps: true,
  }
)

const Record = model('Record', recordSchema)

export default Record