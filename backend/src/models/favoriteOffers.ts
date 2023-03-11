import { InferSchemaType, model, Schema } from "mongoose";

const favoriteOffersSchema = new Schema({
    userId: String,
    favoriteOffersId: String
});
  

  type favoriteOffersSchema = InferSchemaType<typeof favoriteOffersSchema>;

export default model<favoriteOffersSchema>("FavoriteOffer", favoriteOffersSchema);