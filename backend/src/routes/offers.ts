import express from "express";
import * as OffersController from "../controllers/offers"

const router = express.Router();

router.get("/", OffersController.getOffers);

router.get("/:offerId", OffersController.getOffer);

router.post("/", OffersController.createOffer);

export default router;