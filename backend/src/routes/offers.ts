import express from 'express';
import * as OffersController from '../controllers/offers';

const router = express.Router();

router.get('/', OffersController.getOffers);
router.get('/search', OffersController.searchOffer);
router.get('/:offerId', OffersController.getOffer);
router.post('/', OffersController.createOffer);
router.patch('/:offerId', OffersController.updateOffer);
router.delete('/:offerId', OffersController.deleteOffer);

export default router;
