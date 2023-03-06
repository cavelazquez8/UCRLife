import { InferSchemaType, model, Schema } from "mongoose";

const messageSchema = new Schema({
    conversationId: String,
    sender: String,
    text: String,
    },
    {timestamps: true},
  );
  

  type Message = InferSchemaType<typeof messageSchema>;

export default model<Message>("Message", messageSchema);