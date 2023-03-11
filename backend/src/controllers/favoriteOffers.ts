import { RequestHandler } from 'express';
import createHttpError from 'http-errors';
import mongoose from 'mongoose';
import favoriteOffersModel from '../models/favoriteOffers';
import offerModel from '../models/offer';
import userModel from '../models/user';


export const addOffer: RequestHandler = async (req, res, next) => {
    const userid = req.session.userID;
	const offerid = req.params.offerId;
	try {
        if(!userid){
            throw createHttpError(400,"User not logged in")
        }
        if (!mongoose.isValidObjectId(offerid)) {
			throw createHttpError(401, 'Invalid offer id');
		}
        const user = await userModel.findById(userid).exec();
        const offer = await offerModel.findById(offerid).exec();
        if(!offer){
            throw createHttpError(402, 'Offer not found');
        }

        const favoriteOffer = await favoriteOffersModel.findOne({userId: user.username, favoriteOffersId: offerid}).exec();
        if(favoriteOffer){
            throw createHttpError(403, 'Offer exists');
        }
        const newfavoriteOfferUser = await favoriteOffersModel.create({
            userId: user.username,
            favoriteOffersId: offerid
        });
		res.status(200).json(newfavoriteOfferUser);
        
	} catch (error) {
		next(error);
	}
};

export const deleteFavorite: RequestHandler = async (req, res, next) => {
    const loggedUserId = req.session.userID;
    const offerid = req.params.offerId;
	try {
        if(!loggedUserId){
            throw createHttpError(401, "User not logged in");
        }
        const user = await userModel.findById(loggedUserId);

        const favoriteOffer = await favoriteOffersModel.find({userId: user.username, favoriteOffersId: offerid}).exec();
        if(!favoriteOffer){
            throw createHttpError(401, "Offer not found");
        }
        await favoriteOffersModel.deleteOne({userId: user.username, favoriteOffersId: offerid}).exec();
		res.sendStatus(204);
	} catch (error) {
		next(error);
	}
};

export const getFavorites: RequestHandler = async (req, res, next) => {
    const userid = req.session.userID;
	try {
        if(!userid){
            throw createHttpError(400, "User not logged in");
        }
        const user = await userModel.findById(userid);
        const favoriteOffers = await favoriteOffersModel.find({userId: user.username}).exec();
		res.status(200).json(favoriteOffers);
	} catch (error) {
		next(error);
	}
}