import { model, Model, Schema } from "mongoose";

const chatSchema = new Schema({
    name:{
        type: String,
        ref: 'User'
    },
    texting:{
        type: String,
        required: true 
    }
  
},
  {
    timestamps: true,
  }

)


const Chat = model('chat', chatSchema)

export default Chat