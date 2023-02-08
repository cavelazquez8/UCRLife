import { RequestHandler } from "express";
import offerModel from "../models/offer";

export const getOffers: RequestHandler = async (req, res, next) => {
    try {
        const offers = await offerModel.find().exec();
        res.status(200).json(offers);
    } catch (error) {
        next(error);
    }
};

export const createOffer: RequestHandler = async (req, res, next) => {
    const title = req.body.title;
    const description = req.body.description;
    const price = req.body.price;

    try {
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