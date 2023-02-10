import { InferSchemaType, model, Schema } from "mongoose";

const offerSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String },
    price: { type : Number, required : true },
    category: {
        type: String,
        enum: ['books', 'electronics', 'supplies', 'miscellaneous']
    },
}, { timestamps: true });

type Offer = InferSchemaType<typeof offerSchema>;

export default model<Offer>("Offer", offerSchema);