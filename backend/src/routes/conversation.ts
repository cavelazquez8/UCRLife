import express from "express";
import * as ConversationController from "../controllers/conversation";

const router = express.Router();

router.post("/newConversation", ConversationController.addConversation);
router.get("/getUser", ConversationController.userSpecificConversation);
export default router;