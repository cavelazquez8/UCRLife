import { RequestHandler } from 'express';
import createHttpError from 'http-errors';
import mongoose from 'mongoose';
import offer from '../models/offer';
import offerModel from '../models/offer';
// offerModel.createIndexes({title:"text"});
export const getOffers: RequestHandler = async (req, res, next) => {
	try {
		console.log('GetOffer');
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
			throw createHttpError(400, 'Invalid offer id');
		}

		const offer = await offerModel.findById(offerId).exec();

		if (!offer) {
			throw createHttpError(404, 'offer not found');
		}

		res.status(200).json(offer);
	} catch (error) {
		next(error);
	}
};

interface CreateOfferBody {
	title?: string;
	description?: string;
	imgURL?: string;
	price?: number;
	category?: string;
}

export const createOffer: RequestHandler<
	unknown,
	unknown,
	CreateOfferBody,
	unknown
> = async (req, res, next) => {
	const title = req.body.title;
	const description = req.body.description;
	const imgURL = req.body.imgURL;
	const price = req.body.price;
	const category = req.body.category;

	try {
		if (!title) {
			throw createHttpError(400, 'Offer must have a title');
		}

		if (!price) {
			throw createHttpError(400, 'Offer must have a price');
		}

		const newOffer = await offerModel.create({
			title: title,
			description: description,
			imgURL: imgURL,
			price: price,
			category: category,
		});
		res.status(201).json(newOffer);
	} catch (error) {
		next(error);
	}
};

interface UpdateOfferParams {
	offerId: string;
}

interface SearchParams {
	keyword: string;
}

interface UpdateOfferBody {
	title?: string;
	description?: string;
	imgURL?: string;
	price: number;
	category: string;
}

export const updateOffer: RequestHandler<
	UpdateOfferParams,
	unknown,
	UpdateOfferBody,
	unknown
> = async (req, res, next) => {
	const offerId = req.params.offerId;
	const newTitle = req.body.title;
	const newDescription = req.body.description;
	const newImgURL = req.body.imgURL;
	const newprice = req.body.price;
	const newcategory = req.body.category;

	try {
		if (!mongoose.isValidObjectId(offerId)) {
			throw createHttpError(400, 'Invalid offer id');
		}

		if (!newTitle) {
			throw createHttpError(400, 'Offer must have a title');
		}

		if (!newprice) {
			throw createHttpError(400, 'Offer must have a price');
		}

		const offer = await offerModel.findById(offerId).exec();

		if (!offer) {
			throw createHttpError(404, 'offer not found');
		}

		offer.title = newTitle;
		offer.description = newDescription;
		offer.imgURL = newImgURL;
		offer.price = newprice;
		offer.category = newcategory;

		const updatedOffer = await offer.save();

		res.status(200).json(updatedOffer);
	} catch (error) {
		next(error);
	}
};

export const deleteOffer: RequestHandler = async (req, res, next) => {
	const offerId = req.params.offerId;

	try {
		if (!mongoose.isValidObjectId(offerId)) {
			throw createHttpError(400, 'Invalid offer id');
		}

		const offer = await offerModel.findById(offerId).exec();

		if (!offer) {
			throw createHttpError(404, 'Offer not found');
		}

		await offer.remove();

		res.sendStatus(204);
	} catch (error) {
		next(error);
	}
};

export const searchOffer: RequestHandler = async (req, res, next) => {
	// const { keyword } = req.query;
	// const keyword = req.query.keyword;
	// console.log(keyword);
	// const offer = await offerModel
	// 	.find({ $or: [{ title: { $regex: keyword, $option: 'i' } }] })
	// 	.exec();
	// console.log(offer);
	// if (!offer) {
	// 	throw createHttpError(404, 'offer not found');
	// }

	// res.status(200).json(offer);

	try {
		const keyword = req.query.keyword;
		console.log('keyword: ' + keyword);

		// await offerModel.init();
		// const offers = await offerModel.find().exec();
		const offers = await offerModel.find({
			$text: { $search: `"${keyword}"` },
		});
		// const offers = await offerModel.find({
		// 	{ title: "Scooter"},
		// });

		res.status(200).json(offers);
	} catch (error) {
		next(error);
	}
};
