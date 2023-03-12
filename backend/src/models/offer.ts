import { InferSchemaType, model, Schema } from "mongoose";

const offerSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, required: true },
    title: { type: String, required: true },
    username: { type: String },
    description: { type: String },
    imgURL: { type: String },
    price: { type : Number, required : true },
    category: {type: String,},
    ratings: [
        {
            star: {type: Number},
            comment : {type: String},
            postedby: {type: Schema.Types.ObjectId, required: true},
            postUsername: { type: String, required: true },
        },
    ],
    totalrating:{
        type: String,
        default: 0,
    },
}, { timestamps: true });

type Offer = InferSchemaType<typeof offerSchema>;

export default model<Offer>("Offer", offerSchema);