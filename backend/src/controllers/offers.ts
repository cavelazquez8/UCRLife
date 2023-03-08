import { RequestHandler } from 'express';
import createHttpError from 'http-errors';
import mongoose from 'mongoose';
import offerModel from '../models/offer';
import { assertDefined } from '../util/assertDefined';

export const getUserOffers: RequestHandler = async (req, res, next) => {
	const loggedUserId = req.session.userID;
	try {
		assertDefined(loggedUserId);
		console.log('GetOffer');
		const offers = await offerModel.find({ userId: loggedUserId }).exec();
		res.status(200).json(offers);
	} catch (error) {
		next(error);
	}
};

export const getAllOffers: RequestHandler = async (req, res, next) => {
	const loggedUserId = req.session.userID;
	try {
		assertDefined(loggedUserId);
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
	username?: string;
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
	const username = req.body.username;
	const description = req.body.description;
	const imgURL = req.body.imgURL;
	const price = req.body.price;
	const category = req.body.category;
	const loggedUserId = req.session.userID;

	try {
		assertDefined(loggedUserId);
		if (!title) {
			throw createHttpError(400, 'Offer must have a title');
		}

		if (!price) {
			throw createHttpError(400, 'Offer must have a price');
		}

		const newOffer = await offerModel.create({
			userId: loggedUserId,
			username: username,
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

interface UpdateOfferBody {
	title?: string;
	username?: string;
	description?: string;
	imgURL?: string;
	price: number;
	category: string;
}

// <
// 	UpdateOfferParams,
// 	unknown,
// 	UpdateOfferBody,
// 	unknown
// >

export const updateOffer: RequestHandler = async (req, res, next) => {
	const offerId = req.params.offerId;
	const newTitle = req.body.title;
	const newUsername = req.body.username;
	const newDescription = req.body.description;
	const newImgURL = req.body.imgURL;
	const newprice = req.body.price;
	const newcategory = req.body.category;
	const loggedUserId = req.session.userID;

	try {
		assertDefined(loggedUserId);
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
		offer.username = newUsername;
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



export const rating: RequestHandler = async (req, res, next) => {
	const loggedUserId = req.session.userID;
	const star = req.body.star;
	const offerId = req.params.offerId;


	try {
		
		if (!mongoose.isValidObjectId(offerId)) {
			throw createHttpError(400, 'Invalid offer id');
		}

		const offer = await offerModel.findById(offerId).exec();

		if (!offer) {
			throw createHttpError(404, 'Offer not found');
		}

		let alreadyRated = offer.ratings.find((userId) => userId.postedby.toString()=== loggedUserId.toString());
		if(alreadyRated){
			const updateRating = await offerModel.updateOne({
				ratings: {$elemMatch:alreadyRated}
			}, 
			{
				$set: {"ratings.$.star":star}
			},
			{
				new: true,
			}
			);
			res.json(updateRating);
		}else{
			const rateProduct = await offerModel.findByIdAndUpdate(offerId, {
				$push: {
					ratings:{
						star: star,
						postedby: loggedUserId,
					},
				},
			},
			{
				new: true,
			}
			);
			res.json(rateProduct);
		}
		const getallratings = await offerModel.findById(offerId);
		let totalRating = getallratings.ratings.length;
		let ratingsum = getallratings.ratings.map((item) => item.star).reduce((prev,curr) => prev + curr, 0);
		let actualRating = Math.round(ratingsum/totalRating);
		let finalproduct = await offerModel.findByIdAndUpdate(offerId, {
			totalrating: actualRating,
		}, 
		{new:true}
		
		);
		res.json(finalproduct);
	} catch (error) {
		next(error);
	}
};