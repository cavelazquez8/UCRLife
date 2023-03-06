import { InferSchemaType, model, Schema } from "mongoose";

const ConversationSchema = new Schema({
    users:{
        type: Array,
    },
}, { timestamps: true });

type Conversation = InferSchemaType<typeof ConversationSchema>;

export default model<Conversation>("Conversation", ConversationSchema);