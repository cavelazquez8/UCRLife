import express from "express";
import * as OffersController from "../controllers/offers"

const router = express.Router();

router.get("/", OffersController.getOffers);

router.post("/", OffersController.createOffer)

export default router;