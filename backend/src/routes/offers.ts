import express from 'express';
import * as OffersController from '../controllers/offers';

const router = express.Router();

router.get('/', OffersController.getUserOffers);
router.get('/all', OffersController.getAllOffers);
router.get('/search', OffersController.searchOffer);
router.get('/:offerId', OffersController.getOffer);
router.post('/', OffersController.createOffer);
router.patch('/:offerId', OffersController.updateOffer);
router.delete('/:offerId', OffersController.deleteOffer);
router.put('/rating', OffersController.rating)

export default router;
