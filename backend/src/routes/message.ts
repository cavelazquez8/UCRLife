import express from "express";
import * as MessageController from "../controllers/message";

const router = express.Router();

router.post("/send", MessageController.sendMessage);
router.get("/:conversationId", MessageController.getMessages);
//router.get("/", MessageController.getUserInteractions);
export default router;
