import { InferSchemaType, model, Schema } from "mongoose";


const messageSchema = new Schema({
    sender: String,
    recipient: String,
    text: String
  });
  
  type Message = InferSchemaType<typeof messageSchema>;

export default model<Message>("Message", messageSchema);