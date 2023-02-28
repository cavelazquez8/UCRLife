import { InferSchemaType, model, Schema } from "mongoose";

const offerSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String },
    imgURL: { type: String },
    price: { type : Number, required : true },
    category: {type: String,},
}, { timestamps: true });

type Offer = InferSchemaType<typeof offerSchema>;

export default model<Offer>("Offer", offerSchema);