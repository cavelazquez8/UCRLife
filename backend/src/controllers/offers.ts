import { RequestHandler } from "express";
import createHttpError from "http-errors";
import mongoose from "mongoose";
import offerModel from "../models/offer";

export const getOffers: RequestHandler = async (req, res, next) => {
    try {
        const offers = await offerModel.find().exec();
        res.status(200).json(offers);
    } catch (error) {
        next(error);
    }
};

export const getOffer: RequestHandler = async (req, res, next) => {
    const offerId = req.params.offerId;
    
    try {

        if (!mongoose.isValidObjectId(offerId)) {
            throw createHttpError(400, "Invalid offer id");
        }

        const offer = await offerModel.findById(offerId).exec();

        if (!offer) {
            throw createHttpError(404, "offer not found");
        }

        res.status(200).json(offer);

    } catch (error) {
        next(error);
    }
};

interface CreateOfferBody {
    title?: string,
    description?: string,
    price?: number,
}

export const createOffer: RequestHandler<unknown, unknown, CreateOfferBody, unknown> = async (req, res, next) => {
    const title = req.body.title;
    const description = req.body.description;
    const price = req.body.price;

    try {

        if (!title) {
            throw createHttpError(400, "Offer must have a title");
        }

        const newOffer = await offerModel.create({
            title: title,
            description: description,
            price: price,
        })
        res.status(201).json(newOffer);
        
    } catch (error) {
        next(error);
    }
}