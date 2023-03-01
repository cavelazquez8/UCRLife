import express from "express";
import passport from "passport";
import * as OffersController from "../controllers/offers"

const router = express.Router();

router.get("/", OffersController.getOffers);

router.get("/:offerId", OffersController.getOffer);

router.post(
"/",
passport.authenticate("jwt", { session: false }),
OffersController.createOffer
);

router.patch(
"/:offerId",
passport.authenticate("jwt", { session: false }),
OffersController.updateOffer
);

router.delete(
"/:offerId",
passport.authenticate("jwt", { session: false }),
OffersController.deleteOffer
);

export default router;