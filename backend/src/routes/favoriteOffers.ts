import express from 'express';
import * as favoriteOffersController from '../controllers/favoriteOffers';

const router = express.Router();

router.post('/addOffer/:offerId', favoriteOffersController.addOffer);
router.delete('/:offerId', favoriteOffersController.deleteFavorite);
router.get('/', favoriteOffersController.getFavorites);

export default router;

// /api/favorite