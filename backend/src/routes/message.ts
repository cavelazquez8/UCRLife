import express from "express";
import { sendMessage, getMessages } from "../controllers/message";

const router = express.Router();

router.post("/", sendMessage);

router.get("/message", getMessages);

export default router;
